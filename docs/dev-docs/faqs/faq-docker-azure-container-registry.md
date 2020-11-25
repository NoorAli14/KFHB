# Pulling images from Azure container registry

## Pre-requisites
* You must have at the least `Reader` permission in the Aion's Azure subscription for your Active Directory user.
* You must have downloaded and installed [Azure CLI tool](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).

## Setup your Azure CLI
If you have never used Azure CLI, you'll have to set it up first, as shown below:

```
az login
```

This will briefly open up your web browser to authenticate you with MS Active Directory. Once that is done, the command prompt would show you user details, and you are good to go.

## In case you have multiple Azure subscriptions
Before proceeding further, check if you have more than one Azure subscriptions configured:
```
az account list
```

If you see multiple accounts, you need to set up the proper one (which as of now is with the name `Microsoft Azure (aiondigital): #1412504`. You need to note down the `id` (and not tenantId or anything else) of this account, and then set that up:
```
az account set --subscription c576a499-f905-41d9-8507-d2d73a01d271
```


## Login to Azure container registry
There are various ways to authenticate with the registry, but the recommended way is to use Azure CLI's `az acr login` as shown below.

```
az acr login -n aioncontainer --expose-token
```

The `--expose-token` is an optional parameter that would return a JSON object with an `accessToken`. This is handy if you later want to login from a terminal which doesn't have your Active Directory user (such as a remote Linux VM). Copy the value of `accessToken` in a temporary text file to you it in the later command.


## Reusing the token somewhere else
The `accessToken` from the last step can be used on other machines. The command for that would be as follows:

```
docker login aioncontainer.azurecr.io --username 00000000-0000-0000-0000-000000000000 
```

Note that the value of the username is to be given exactly as shown above. Docker will then ask for the password, which you need to provide on the terminal as obtained from the `accessToken`.


## Pulling a docker image
Once you are logged in by either of the above methods, you can simply pull (or push) an image as follows:

```
docker pull aioncontainer.azurecr.io/rubixgateway:master_latest
```


## Testing logout from docker
If you wish, you can logout from the container registry by running the following command:
```
docker logout aioncontainer.azurecr.io
```