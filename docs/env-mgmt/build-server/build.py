#!/usr/bin/env python3
"""
Utility Script for compiling code to containers
Organization: Aion Digital
Authur: Faizan Ahmad (faizan@aiondigital.com)
Designation: Sr. Software Engineer
Created At: 2020-06-11

Change History
[FA:2020-06-11] Initial checkin
"""

# Reference: https://gitpython.readthedocs.io/en/stable/tutorial.html
# pip install gitpython
# pip install boto3

import git
from git import Repo
import boto3
from botocore.client import Config
import json
import getpass
import shutil
import os
from git import RemoteProgress
import threading
import sys

_PREFIX_ROOT_NAME = "aiondigital"
_FILE_NAME = "config.json"
_S3_IMAGES_LOC = None
_TEMP_IMAGES_LOC = None
_PASS = ""
_USERID = ""
_REPO_NAME = ""
_TMPDIR = ""
_TAGPOSTFIX = None
s3ClientObj = None
_S3_CLIENT_OBJ = None

class ProgressPercentage(object):

    def __init__(self, filename):
        self._filename = filename
        self._size = float(os.path.getsize(filename))
        self._seen_so_far = 0
        self._lock = threading.Lock()

    def __call__(self, bytes_amount):
        # To simplify, assume this is hooked up to a single filename
        with self._lock:
            self._seen_so_far += bytes_amount
            percentage = (self._seen_so_far / self._size) * 100
            sys.stdout.write(
                "\r%s  %s / %s  (%.2f%%)" % (
                    self._filename, self._seen_so_far, self._size,
                    percentage))
            sys.stdout.flush()



def main():
    # Step 1: Set JSON configuration path
    setJsonConfigPath()
    
    #Step 2: Display banner
    displayBanner()
    
    #Step 3: Input User Source Control Credentials
    getUserInput()
    
    # Step 4: Read JSON config file
    data = loadConfig()
     
    #Step 4: Prune all existing images
    pruneAllImages()
     
    #Step 5: Recycle temp directory
    recycleTempDir(data['tempGitRepoLoc'])
     
    #Step 6: Clone the Repo from source control
    checkOutRepository(data['gitRepoURL'],_USERID,_PASS)
      
    #Step 7: Loop over all services, build containers and upload it on s3. 
    for key in data['configurations']:
      try:
        print("* Initiating build for service: ",  key['serviceName'])
        buildContainer(key, data['tagPostFix'])
        print("* Completed build for service: ",  key['serviceName'])
      except git.exc.GitCommandError as e:
        displayException(e,'** Error occur while fetching code from repo')

def displayBanner():
    print('***** Utility for compiling the respective source *****')
    print('Copyright 2020 AionDigital')

# Set JSON configuration params
def setJsonConfigPath():
    global _FILE_NAME
    print(sys.argv)
    if len(sys.argv) > 2:
        print("* Loading configuration file: ", sys.argv[1])
        _FILE_NAME = sys.argv[1]

# Load configuration file
def loadConfig():
    global _TEMP_IMAGES_LOC, _S3_IMAGES_LOC, _S3_CLIENT_OBJ
    data = None
    try:
        with open(_FILE_NAME, "r") as read_file:        
            data = json.load(read_file)
            _TEMP_IMAGES_LOC = data['tempImagesLoc'] # Set locally images storage path
            _S3_IMAGES_LOC = data['s3StorageLoc'] # Set s3 images storage path
            _S3_CLIENT_OBJ   = data['s3ClientObj'] # Init S3 client configuration 
    except FileNotFoundError:
        print('** [ERROR!] Configuration file {0} not found'.format(_FILE_NAME))
        sys.exit(-1)        
    return data
    
# Parameters: checkOutRepository(repoURL, userID, password)
# 
# repoURL: https://{0}:{1}@github.com/aiondigital/rubix.mw.git
# userId: user git username
# password: user git password

# This method is used the clone the specified git repo.
def checkOutRepository(repoURL, userID, password):
    global _REPO_NAME
    _REPO_NAME = repoURL.split("/").pop().split(".git")[0] # find the git repo name from url for `rubix.mw`
    print('** Checking-out code from repository:', repoURL.split("/").pop())
    repoURL = repoURL.format(userID, password)
    #print('** Cloning:', repoURL)
    git.Git(_TMPDIR).clone(repoURL) # clone the git repo
    

def recycleTempDir(tmpFolder):
    global _TMPDIR
    print('* Recycling directory:', _TMPDIR)
    _TMPDIR = tmpFolder
    shutil.rmtree(tmpFolder,ignore_errors=True, onerror=None)    
    os.makedirs(tmpFolder)

# Get Input for user git credentials
def getUserInput():   
    global _USERID, _PASS
    _USERID = input("Enter git username : ") 
    _PASS = getpass.getpass(prompt='Please enter git password: ')

# Handle exception and print error trace log.
def displayException(e, stage: str):
    print('------------------------- ERROR TRACE -------------------------')    
    print("Unabel to connect to the repository. Please check the credentials")
    print('---------------------------------------------------------------')

def dockerBuild(repoName, containerName):
    repoPath =_TMPDIR + '/' + _REPO_NAME + '/' + repoName
    # Generate dcker build command
    # Example: docker build -t aiondigital/conduit.authorities:0.0.3-bbyn -f /home/baqai/src/aiondigital.bk/bbyn/bbyn.mw.git/fs.bs.db.cdtauthority.api/Dockerfile /hom/baqai/src/aiondigital.bk/bbyn/bbyn.mw.git/fs.bs.db.cdtauthority.api
    buildCommand = "docker build -t {0} -f {1} {2}".format(containerName, repoPath + '/Dockerfile',repoPath)
    os.system(buildCommand)
    
def saveContainer(servicePath, fileName, containerName):
    # Generate docker output command
    # Example: docker save --output /home/baqai/src/images/bbyn/conduit.authorities/conduit.authorities_0.0.3-bbyn.tar aiondigital/conduit.authorities:0.0.3-bbyn
    outputCommand = "docker save --output {0}.tar {1}".format(servicePath + '/' + fileName, containerName)
    print("** Exporting images to a archive file: ", servicePath + "/" + fileName + '.tar')
    if os.path.isdir(servicePath) == False : 
        os.makedirs(servicePath)
    os.system(outputCommand)
    #print("\n** Export " + key['repoName'] + " container .... ... \n", outputCommand)


# Build Container: buildContainer(key, tagPostFix)
# Parameters
# key: {
#     "serviceName": "conduit.authorities",
#     "repoName" : "fs.bs.db.cdtauthority.api",
#     "lastVersion" : "0.0.3"
#  }
# tagPostFix:     It's a postfix tag. etc kfhk, bbyn, rubix ....
        
def buildContainer(key, tagPostFix):
    serviceName = key['serviceName'] #Examle: conduit.authorities
    tag = key['lastVersion'] + '-' + tagPostFix #Example: 0.0.3-bbyn
    fileName = serviceName + '_' + tag #Example: conduit.authorities_0.0.3-bbyn
    servicePath = _TEMP_IMAGES_LOC + '/' + serviceName
    containerName = _PREFIX_ROOT_NAME + '/' + serviceName + ':' +tag #Example: aiondigital/conduit.authorities:0.0.3-bbyn
    
    # Step 1: Build Image
    dockerBuild(key['repoName'], containerName)
    
    # Step 2: Save build image as .tar
    saveContainer(servicePath, fileName, containerName)
    
    # Step 2: Upload container to s3.
    uploadFile(servicePath, serviceName, fileName + '.tar')

    
def pruneAllImages():
    print("* Pruning all images")
    os.system("docker images prune -a -q")

# Init S3 client instance
def s3Client():
    global s3ClientObj
    if s3ClientObj == None :
      session = boto3.session.Session()
      s3ClientObj = session.client('s3',
                            region_name=_S3_CLIENT_OBJ['regionName'],
                            endpoint_url=_S3_CLIENT_OBJ['endpointURL'],
                            aws_access_key_id=_S3_CLIENT_OBJ['accessKey'],
                            aws_secret_access_key=_S3_CLIENT_OBJ['secretKey'])
    return s3ClientObj;
                            
def uploadFile(servicePath, serviceName, fileName):
    fileLoc = servicePath + '/' + fileName
    s3FileUploadingPath = _S3_IMAGES_LOC + serviceName + '/' + fileName
    s3Client().upload_file(fileLoc, _S3_CLIENT_OBJ['bucketName'], s3FileUploadingPath, Callback = ProgressPercentage(fileLoc))
    
if __name__ == '__main__':
    main()