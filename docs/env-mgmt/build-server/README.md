Build server
===========

The common build server is hosted on MS Azure. The VM name is `aionservercentos.westindia.cloudapp.azure.com` with public IP address of `52.183.133.141`.

User id's
--------
Unique user id would be created for each individual, and team members should login with their own user id's and switch to the common user for carrying out team related activities. For example,
```
ssh mshah@52.183.133.141
Password:

[mshah@AionServerCentOS ~]$ sudo -u rubix /bin/bash

[rubix@AionServerCentOS mshah]$ whoami
rubix

[rubix@AionServerCentOS mshah]$ echo $HOME
/home/rubix

[rubix@AionServerCentOS mshah]$ cd $HOME
[rubix@AionServerCentOS ~]$
```

Uploading SSH keys
------------------
One benefit of having individual id's is the ability to upload SSH keys to the server so that login without a password is possible. Use `git client` on your local machine to generate and upload the key as shown below
```
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/MuhammadAliShah/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/MuhammadAliShah/.ssh/id_rsa
:
:
```

Next upload the keys to your account, as illustrated below:
```
$ ssh-copy-id mshah@52.183.133.141
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/c/Users/MuhammadAliShah/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
Password:

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'mshah@52.183.133.141'"
and check to make sure that only the key(s) you wanted were added.
```

As instructed, you can now login without entering the password:
```
$ ssh mshah@52.183.133.141
[mshah@AionServerCentOS ~]$
```