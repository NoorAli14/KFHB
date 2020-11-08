# Quick summary
The following API's are important for initiating and resuming onboarding:

* `/auth/register` - to initiate a fresh onboarding application
* `/auth/me` - to identify the last step of a previous attempt of onboarding
* `/auth/refresh-token` - can be used to obtain a new access token if previous one is expired

The full list of steps is provided later in this document.
  
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

## Onboarding step details
Following is the full list of these steps. All API's in the following table have the prefix `/api/v1/onboarding`. Also, all API's which update the onboarding status are of HTTP method `POST` type. The system does provide several `GET` API's as well, but since they don't change the status of the onboarding application, they are not listed here.

|Last step completed successfully          |URL                   |Description |
|------------------------------------------|----------------------|------------|
|RBX_ONB_STEP_REG_INITIATED                |/auth/register        |Used to register a new customer into the system                                       |
|(see next row)                            |/sessions             |Used to initiate a selfie upload (create Daon user)                                   |
|RBX_ONB_STEP_SELFIE_UPLOADED              |/faces/selfie/upload  |Used to upload a selfie; need to be invoked 3 times with different sub-step parameter |
|RBX_ONB_STEP_LIVENESS_UPLOADED            |/faces/liveness/upload|Used to upload a liveness image                                                       |
|RBX_ONB_STEP_NATIONAL_ID_FRONT_UPLOADED   |/documents/nationality-id-front/upload  |Used to upload a national-id front image                            |
|RBX_ONB_STEP_NATIONAL_ID_BACK_UPLOADED    |/documents/nationality-id-back/upload   |Used to upload a national-id back image                             |
|RBX_ONB_STEP_PASSPORT_UPLOADED            |/documents/passport/upload              |Used to upload a passport image                                     |
|RBX_ONB_STEP_DRIVING_LICENCE_UPLOADED     |/documents/driving-license/upload       |Used to upload a driving-license image                              |
|RBX_ONB_STEP_NATIONAL_ID_FRONT_PROCESSED  |/documents/nationality-id-front/process |Used to process and fetch national-id front info                    |
|RBX_ONB_STEP_NATIONAL_ID_BACK_PROCESSED   |/documents/nationality-id-back/process  |Used to process and fetch national-id back MRZ info                 |
|RBX_ONB_STEP_PASSPORT_PROCESSED           |/documents/passport/process             |Used to process and fetch passport MRZ info                         |
|RBX_ONB_STEP_DRIVING_LICENCE_PROCESSED    |/documents/driving-license/process      |Used to process and fetch driving-license info                      |
|RBX_ONB_STEP_DOCUMENTS_MATCHED            |/documents/verification                 |Used to perform evaluation based on the images and configured rules |
|RBX_ONB_STEP_DOCUMENTS_MISMATCHED         |(same as above)                         |(same as above)                                                     |
|RBX_ONB_STEP_SMS_OTP_SENT                 |/otp/sms/send         |Used to send OTP via SMS to validate mobile phone number                              |
|RBX_ONB_STEP_EMAIL_OTP_SENT               |/otp/email/send       |Used to send OTP via email to validate email address                                  |
|RBX_ONB_STEP_SMS_OTP_VERIFIED             |/otp/sms/verify       |Used to verify the OTP; needs to be invoked with a verification type (SMS/ email)     |
|RBX_ONB_STEP_EMAIL_OTP_VERIFIED           |/otp/email/verify     |Used to verify the OTP; needs to be invoked with a verification type (SMS/ email)     |
|RBX_ONB_STEP_AML_SCREENING_SUCCESSFUL     |/aml/screening        |Used to check the AML status.                                                         |
|RBX_ONB_STEP_AML_SCREENING_FAILED         |(same as above)       |(same as above)                                                                       |
|RBX_ONB_STEP_CRS_SUBMITTED                |/compliance/crs       |Used to submit CRS compliance data                                                    |
|RBX_ONB_STEP_FATCA_SUBMITTED              |/compliance/fatca     |Used to submit FATCA compliance data                                                  |
|RBX_ONB_STEP_KYC_SUBMITTED                |/compliance/kyc       |Used to submit KYC compliance data                                                    |
|RBX_ONB_STEP_AGENT_VERIFICATION_SCHEDULED |/agents/appointments  |Used to schedule an appointment with the human agent for verification/ help           |
|RBX_ONB_STEP_AGENT_VERIFICATION_SUCCESSFUL|/agents/verification  |Used to submit verification result by an agent after the video call                   |
|RBX_ONB_STEP_AGENT_VERIFICATION_FAILED    |(same as above        |(same as above)                                                                       |


## Application reinstall flow
If an application is re-installed, and the access tokens are lost, there is no way for the application to resume the previous flow. Doing so would breach the security of the onboarding solution.

Either the access token and refresh token from the previous install are used, or a fresh onboarding application is made. There is no third choice.