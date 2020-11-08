# Agent gender preference
The mobile application specifies the preferred gender of the agent in the customer first name attribute. For Android, for example, the sample code is as follows:

```
com.contusflysdk.v2.models.CallDetails call = new CallDetails();
call.setFirstName(localUser+" :M"); 
```

The Angular portal, which is used by the agent, will pick up these last two bytes from the customer first name field and use that add the proper text in the notification pop up shown to the agent.

For example, if the person first name is "Khalid" and the preferred gender to speak with is "male", the value in the customer first name field would be "`Khalid :M`". The notification popup will show the following in addition to the call pickup and decline buttons:

```
Customer Name: Khalid
Agent Preference: Male
```