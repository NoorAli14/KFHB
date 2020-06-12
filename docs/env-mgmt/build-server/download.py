#!/usr/bin/env python3
""" Utility Script for downloading and loading docker images from AionDigital object store 
 
Organization: Aion Digital
Authur: Faizan Ahmad (faizan@aiondigital.com)
Designation: Sr. Software Engineer
Created At: 2020-06-11

Change History
[FA:2020-06-11] Initial checkin
"""
# pip3 install boto3
import boto3 
from botocore.client import Config
import sys 
import json 
import os 
import threading 
import time
 
_FILE_NAME = 'config.json'
_PREFIX_ROOT_NAME = 'aiondigital'
s3ClientObj = None

class ProgressPercentage(object):
    def __init__(self, filename, objSize):
        self._filename = filename
        # self._size = float(os.path.getsize(filename))
        self._size = float(objSize)
        self._seen_so_far = 0
        self._lock = threading.Lock()
    def __call__(self, bytes_amount):
        # To simplify, assume this is hooked up to a single filename
        with self._lock:
            self._seen_so_far += bytes_amount
            percentage = (self._seen_so_far / self._size) * 100
            sys.stdout.write(
                "\r%s %s / %s (%.2f%%)" % (
                    self._filename, self._seen_so_far, self._size,
                    percentage))
            sys.stdout.flush()

# Main entry function
def main():
    # Step 1: Set JSON configuration path
    setJsonConfigPath()
    # Step 2: Load buildConfig.json
    config = loadConfig()
    # Step 3: For each configuration item, download image
    for key in config['configurations']:
        downloadedFile = downloadFile(config['downloadImagesLoc'], key, config['tagPostFix'])
        # Step 4: Load image on the local repo
        loadImageInDocker(downloadedFile)

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
            _S3_IMAGES_LOC   = data['s3StorageLoc'] # Set s3 images storage path
            _S3_CLIENT_OBJ   = data['s3ClientObj'] # Init S3 client configuration 
    except FileNotFoundError:
        print('** [ERROR!] Configuration file {0} not found'.format(_FILE_NAME))
        sys.exit(-1)        
    return data

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
    
# Procedure for downloading files from object storage
def downloadFile(fileLoc, key, tagPostFix):
    serviceName = key['serviceName'] #Examle: conduit.authorities
    tag = key['lastVersion'] + '-' + tagPostFix # Example: 0.0.3-bbyn
    fileName = serviceName + '_' + tag + '.tar' # Example: conduit.authorities:0.0.3-bbyn.tar
    filePath = serviceName + '/' + fileName
    s3FileLocation = _S3_IMAGES_LOC + filePath
    localFilePath = fileLoc + fileName
    createDirectory(fileLoc)
    print('** Downloading file:', filePath)
    s3Client().download_file(_S3_CLIENT_OBJ['bucketName'], # bucket location
                    s3FileLocation, # remote file name
                    localFilePath, # localfile name
                    Callback = ProgressPercentage(localFilePath,
                                                s3ClientObj.head_object(Bucket = _S3_CLIENT_OBJ['bucketName'], Key = s3FileLocation)['ContentLength']))
    
    return localFilePath

# Create directory if it does not exist
def createDirectory(dirLocation):
    if os.path.isdir(dirLocation) == False :
        print('** Creating directory:', dirLocation)
        os.makedirs(dirLocation) 

# Load .tar file
def loadImageInDocker(fileName):
    print('')
    print('* Loading image [{0}] in docker local repository'.format(fileName))
    os.system('docker load --input {0}'.format(fileName)) 

if __name__ == '__main__':
    main()
