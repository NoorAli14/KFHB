Quick summary
========
* Persistence layer
  * Use `datetimeoffset` to store dates in MS SQL Server. This is true for all date types, such as `created_on` and `holiday_date`.
  * It's preferable to convert the timezone to the server time zone (such as `Arab Standard Time`) before persisting to the `datetimeoffset` column, instead of UTC.
* Request/ response payloads
  * Use **ISO-8601** for accepting dates in request payloads (with timezone information, such as `2020-09-19T22:21:00+04:00`)
  * Return dates in response messages in **ISO-8601** as well. However, use UTC time zone, such as `2020-09-19T18:21:00Z`).
  

Detailed problem statement
========
There are tons of ways of representing date and time. Without implementing a consistent, standard way of formatting them, one developer might choose to go with 'dd-mm-yyyy' while another one might choose 'mm-dd-yyyy'. Inconsistencies will make API's difficult to understand and bugs hard to troubleshoot.

The situation is further complicated by the fact that there are multiple JavaScript libraries that support date time and calendar operations in different ways. There is no dearth of data types when it comes to the date/ time support in the databases. Just MS SQL Server has got [6 data types for that](https://docs.microsoft.com/en-us/sql/t-sql/functions/date-and-time-data-types-and-functions-transact-sql?view=sql-server-ver15#DateandTimeDataTypes)!

There is a need to standardize the API and data type for storage of date and time, not just for standard fields such as `created_on` and `updated_on`, but also for domain specific fields such as `leave_date_start` and `holiday_date`.


Standard for API's
==========
**Rubix** API's will consistently use ISO-8601 for the request and response date-time fields. Examples include the following which represents 9am on the shown date in the UAE time zone (UTC+4):

```
2020-09-19T09:00:00+04:00
```

Client-server time zone differences
----
While the request payload can specify any time zone according to the client locale, the same cannot be done in the response message, unless all date fields are carefully converted from the persisted date's time zone to the client's time zone. Doing this consistently, across all API's is considerable work, and more so, because we'll need to know the client's time zone at each layer of the services architecture. 

It has been decided to return the dates only in UTC time zone. For example, if the date-time mentioned in the earlier example was to be returned back to the client, the value would be as follows (where Z in the standard identifies the UTC time zone). The client application will use the date-time as per the regional settings of the client application.

```
2020-09-19T05:00:00Z
```

**Exceptions**: One could exceptionally use Unix epoch time for certain use cases, but the decision to use epoch time should be given considerably thought and discussed with various team members, and it should be properly documented. Mixing different formats for the same API is not allowed.

References:
---
* [MS API Design Guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#112-guidelines-for-dates-and-times)


Standards for database
==========
The types vary from one database to another. But the general rule is that if a date is to be stored, we must use a data type that includes the time zone information.

MS SQL Server datatimeoffset
----
There are 6 different date and time data types in MS SQL Server. The only one which stores timezone information in addition to the date is `datetimeoffset` ([see here](https://docs.microsoft.com/en-us/sql/t-sql/data-types/datetimeoffset-transact-sql)).

Inserting into such as a column can easily be done with the ISO-8601 formatted string, as shown earlier.

```SQL
-- created a test table
create table TEST_DATE (CREATED_ON datetimeoffset);

-- store 9am of the said date in 'Arab Standard Time' (Bahrain)
insert into TEST_DATE (CREATED_ON) values ('2020-09-19T21:30:00+03:00');
```

Selecting data from this table can be done in UTC by asking MS SQL Server to do the necessary conversion:

```SQL
-- select the date in UTC 
select CREATED_ON at time zone 'UTC' from TEST_DATE;
```

