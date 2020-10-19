# Quick summary
The following API's are important for initiating and resuming onboarding:

* `/auth/register` - to initiate a fresh onboarding application
* `/auth/me` - to identify the last step of a previous attempt of onboarding
* `/auth/refresh-token` - can be used to obtain a new access token if previous one is expired
* 
# Rubix onboarding API - resumption flow

There are three possible ways in which an onboarding process can be initiated from a mobile device:

* A fresh application started by a first time installation of the mobile application
* An installed application is restarted where a user has progressed beyond the first few steps
* An uninstalled application followed by a reinstallation to start an application


## Fresh application after a first time install
The first API invoked during onboarding is `/auth/register` which initiates the registration flow. The request payload takes obvious parameters such as `device_id`, `platform`, `contact_no` and so on.

As part of the response payload a `status` field is returned, which depicts the current onboarding status of the customer. By default, this would be `pending`.

The response headers would contain JWT **access token** for access with encrypted customer id. This token must be included in subsequent requests. There would be an associated **refresh token** included as well, which can be used by the mobile application to request a new **access token**. As expected, the validity of the refresh token is much longer than that of the refresh token.

It's expected from the mobile application to securely store these tokens in the device storage for resumption flow.

## Resumption flow
The resumption flow refers to shutting down the mobile application and restarting it. It would not be wrong to assume that the application would remember where the user left off, and pick up the onboarding flow from there. However, due to security consideration, the mobile application isn't allowed to make these decisions. Rather, the onboarding services determine the last step the user performed and inform the mobile application accordingly.

In order to determine whether a customer can resume or not, the API which should be invoked is `/auth/me`. The request only needs to contain the JWT **access token**. The server side would return customer details as well as the last step onboarding step customer successfully performed in the response message.

If the access token is found to be expired, the mobile application needs to refresh it by calling `/auth/refresh-token` API. It needs to use the **refresh token** in that request to obtain a new **access token**.

Following is the full list of these steps:

* TODO: For @Faizan Add the full list of steps with codes here

## Application reinstall flow
If an application is re-installed, and the access tokens are lost, there is no way for the application to resume the previous flow. Doing so would breach the security of the onboarding solution.

Either the access token and refresh token from the previous install are used, or a fresh onboarding application is made. There is no third choice.