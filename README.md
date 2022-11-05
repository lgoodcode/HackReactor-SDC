## **Environment Variables**

`DATABASE_URI` - The URI connection to the PostgreSQL database\
`PGPASSWORD` - The password to the PostgreSQL database to be able to use the `db:sql:seed` script
without interruption for each `COPY` command.

## Database

### **Timing**

To check the timing for the a query, run the following command:

`npm run db:sql:timing`

### **Seeding**

To seed the database, run the following command:

`npm run db:sql:seed`

## **Testing**

There are two different test sets for the primary database, PostgreSQL.

One is used with the actual database, and the other is used with a mock database.

The latter is used for CI to make sure the returned results and the API operates correctly.

The former is used for truly testing that the database is returning the proper results for the
queries and returning the proper data.

### **MongoDB**

The mongo model uses `mongo` as a dynamic object to be able to be mocked for the CI testing because
it will actually invoke and attempt to create a connection to the database.
