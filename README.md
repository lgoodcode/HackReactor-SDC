## **Environment Variables**

`PORT` - The port that the server will run on - ***default: 4000***\
`PGHOST` - The host of the PostgreSQL database - ***default: localhost***\
`PGDATABASE` - The name of the PostgreSQL database\
`PGPORT` - The port of the PostgreSQL database - ***default: 5432***\
`PGUSER` - The user of the PostgreSQL database\
`PGPASSWORD` - The password to the PostgreSQL database to be able to use the `db:sql:seed` script
without interruption for each `COPY` command.\
`MONGODB_URI` - The URI connection to the MongoDB database

### **Local Development Environment**

To run the server locally for development, you only need to specify the `PGDATABASE,  PGUSER, and PGPASSWORD` environment variables. 

The defaults will work but not for Docker, which requires a different port if a PostgreSQL database is running on the host machine,
and the hostname for Docker on the local machine is `host.docker.internal`.

## **Docker**

A separate Dockerfile is used for the database and the server. The database is needs to use the `/database/data` directory
for local development. This way, the `.dockerignore` file can ignore the `data` directory and not have to worry about
data being added to the docker image for the server container.

The environment variables are set in the `.env` file to use with Docker. For actual production, the environment variables
should be manually set in the environment.

## Database

### **Timing**

To check the timing for the a query, run the following command:

`npm run db:sql:timing`

### **Seeding**

To seed the database, run the following command:

`npm run db:sql:seed`

**Note:** The `PGPASSWORD` environment variable is required for this command to work without prompts for the password
for each file. The `PGUSER` and `PGDATABASE` are also required to specify which database to seed.

### **PostgreSQL**

For some reason, within the model for the PostgreSQL database, double quotes are required around
the column names. This is why underscre_case is used and not camelCase.

### **MongoDB**

The mongo model uses `mongo` as a dynamic object to be able to be mocked for the CI testing because
it will actually invoke and attempt to create a connection to the database.

## **Testing**

There are two different test sets for the primary database, PostgreSQL.

One is used with the actual database, and the other is used with a mock database.

The latter is used for CI to make sure the returned results and the API operates correctly.

The former is used for truly testing that the database is returning the proper results for the
queries and returning the proper data.


