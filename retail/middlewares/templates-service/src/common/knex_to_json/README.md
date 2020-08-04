# Knex To JSON Transformation Library

## Table of Contents

- [Problem statement](#problem-statement)
- [Setup](#setup)
- [Libraries](#libraries)
- [Solution](#solution)

## Problem Statement

We are using GraphQL, KnexJS and SQL database and to optimize the performance we need to filter the selection of the SQL Query.

## Setup

### Libraries

- NestJS
- KnexJS
- GraphQL
- MSSQL Database (SQL Database)
- HydrationJS (DB ResultSet to Json transformation)

---

## Solution

### Reading through Main Info object of the GraphQL request

➡ Limitation

- Reading only first request in the GraphQL Client field.

```javascript
export function graphqlKeys(
  info: Record<string, unknown>,
  tableName?: string,
  resultArr: string[] = [],
): string[] {
  const joins = [];
  info.fieldNodes[0].selectionSet.selections.forEach(item => {
    if (item.selectionSet?.selections) {
      populateKeys(item.selectionSet.selections, item.name.value, resultArr); // Adding Nested Join Properties
      joins.push(item.name.value);
      return;
    }

    if (tableName) {
      resultArr.push(`${tableName}.${item.name.value} AS >${item.name.value}`);
    } else {
      resultArr.push(item.name.value);
    }
  });

  resultArr['joins'] = joins;
  return resultArr;
}
```

### Reading through Nested Objects and generate Joins

➡ Limitation

- Using Convention: Table name has to be same as the Enum name Key to make it work.
- Using Convention: Foreign Key name has to be same as the Enum name Key to make it work.

```js
function populateKeys(
  selections: any[],
  tableName: string,
  resultArr: string[],
): void {
  selections.forEach(child =>
    // Adding child properties as the key to simplify the Select statement in Knex.
    // Mapping the table name with field name of GQL schema.
    resultArr.push(
      `${TABLE[tableName.toUpperCase()]}.${child.name.value} AS >${tableName}>${
        child.name.value
      }`, // Table Name + Column Name for Nested Table
    ),
  );
}
```

### Consuming Joins Array and generating Join Statement

➡ Limitation

- Using Convention: Table name has to be same as the Enum name Key to make it work.
- Using Convention: Foreign Key name has to be same as the Enum name Key to make it work.

```js
if (keys.hasOwnProperty('joins')) {
  keys['joins'].forEach(element => {
    query.join(
      TABLE[element.toUpperCase()],
      // TODO!: Following the Convention, Can be replaced with the Decorator 'Column Name'.
      `${this._tableName}.${element}_id`,
      '=',
      `${TABLE[element.toUpperCase()]}.id`,
    );
  });
}
```

---
