## **Environment Variables**

`PORT` - The port that the server will run on - ***default: 4000***\
`PGHOST` - The host of the PostgreSQL database - ***default: localhost***\
`PGDATABASE` - The name of the PostgreSQL database\
`PGPORT` - The port of the PostgreSQL database - ***default: 5432***\
`PGUSER` - The user of the PostgreSQL database\
`PGPASSWORD` - The password to the PostgreSQL database to be able to use the `db:sql:seed` script
without interruption for each `\copy` command.\
`MONGODB_URI` - The URI connection to the MongoDB database

### **Local Development Environment**

To run the server locally for development, you only need to specify the `PGDATABASE,  PGUSER, and PGPASSWORD` environment variables. 

The defaults will work but not for Docker, which requires a different port if a PostgreSQL database is running on the host machine,
and the hostname for Docker on the local machine is `host.docker.internal`.

## **Deployment**

### **NodeJS**

Need to install the NodeJS binaries:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

### **AWS**

When deploying the server on an EC2 instance, you will need to specify the environment variables for the database connection
or creating a `.env` file in the root directory of the server.

The database only requires the `5432` port to be open for inbound rules for the database connection from the server.

The server requires port `80` to be open and to forward that port to the server port, which is `4000` by default.
To forward the port, you can use the following command:

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 4000
```

To view whether the port forwarding is added, you can use the following command to view the NAT table:

```bash
sudo iptables -t nat -L
```

To access the database from the server, we need to specify the user and password. To do this, we can enter
the `psql` shell and create a user and password.

Enter the Postgres shell as the `postgres` user:
```bash
sudo -u postgres psql
```

Create the user and only give read privileges to the tables in the database:
```sql
CREATE user <username> WITH encrypted password '<password>';
GRANT SELECT ON ALL TABLES IN SCHEME <schema(public)> to <username>;
```

If the user needs to modify the data, then you can instead use the following command:
```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEME <schema(public)> to <username>;
```

List the users and their roles to confirm the user was created:
```sql
\du
```

## **Docker**

A separate Dockerfile is used for the database and the server. The database is needs to use the `/database/data` directory
for local development. This way, the `.dockerignore` file can ignore the `data` directory and not have to worry about
data being added to the docker image for the server container.

The environment variables are set in the `.env` file to use with Docker. For actual production, the environment variables
should be manually set in the environment.

Docker Compose is used to manage the containers for the database and the server. The `docker-compose.yml` file contains
the configuration and allows to read the environment variables from the `.env` file to use.

## **Database**

### **Installation**

Update the OS and install PostgreSQL on Ubuntu:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install postgresql postgresql-contrib
```

Give the `postgres` user access to the `/home/ubuntu` directory to execute sql scripts:

```bash
sudo chown -R postgres:postgres /home/ubuntu
```

or 

```bash
sudo chmod -R /home/ubuntu
```

### **Deployed Performance**

Using [Loader.io](https://loader.io/), the deployed server gives better performance metrics to use
than locally to get a better idea of how it will perform in production.

### **Local Performance**

`GET /products`
- Original - `0.015ms` - Retrieve products with a limit\

`GET /products/:id`
- Original - `90ms` - Originally 2 separate queries on products and features table\
- *Optimized* - `57ms` - Now a single query with a join on the features table and index on the product_id column

`GET /products/:id/styles`
- Original - `65ms` - Retrieve all styles for a product\
- Original - `490ms` - Retrieve all photos for all styles for a product\
- Original - `254ms` - Retrieve all skus for all styles for a product\
- *Original Server Response Time* - `2.5s` - Total time for all 3 queries and transformation sent to client\
- *Optimized* - `1.3s` - Retrieve all styles and the photos and skus for each style for a product through 
a single query that joins all tables together and transforms within the database.\

`GET /products/:product_id/related`
- Original - `105ms` - Retrieve all related products for a product\
- No optimization needed and using an index didn't provide any performance improvements.

### **Timing**

To check the timing for the a query, run the following command:

```bash
npm run db:sql:timing
```

or prefix a query with `EXPLAIN ANALYZE` to view the exectution time.

### **Seeding**

To seed the database, run the following command:

```bash
npm run db:sql:seed
```

**Note:** The `PGPASSWORD` environment variable is required for this command to work without prompts for the password
for each file. The `PGUSER` and `PGDATABASE` are also required to specify which database to seed.

### **PostgreSQL**

For some reason, within the model for the PostgreSQL database, double quotes are required around
the column names. This is why underscre_case is used and not camelCase.


#### **Commands**

```sql
\c <database> -- Connect to a database\
\dt -- List all tables in the current database\
\d <table> -- List all columns in a table\
\copy <table> FROM <file> WITH (FORMAT csv, HEADER true) -- Copy data from a file into a table
EXPLAIN ANALYZE SELECT * FROM <table> -- Explain the query and show the timing
SELECT tablename, indexname, indexdef FROM pg_indexes WHERE schemaname = 'public' -- Shows the indexes for the current database and schema.
```

### **MongoDB**

The mongo model uses `mongo` as a dynamic object to be able to be mocked for the CI testing because
it will actually invoke and attempt to create a connection to the database.

## **Testing**

There are two different test sets for the primary database, PostgreSQL.

One is used with the actual database, and the other is used with a mock database.

The latter is used for CI to make sure the returned results and the API operates correctly.

The former is used for truly testing that the database is returning the proper results for the
queries and returning the proper data.


## **Stress Testing**

### **Artillery**

The initial stress testing was done with the `artillery` package. The `artillery.yml` file, located in
`.artillery`, contains the configuration for the stress testing. The `artillery` package is installed
globally, so it can be run from anywhere.

It generates a json report that can be used to generate a report with the `artillery report` command.

The single `stress-test:artillery` script is used to run the stress test and then executes the `report`.

### **K6**

The K6 package is used as an additional stress testing tool. The `k6.yml` file, located in `.k6`, contains
the configuration for the stress testing.

The K6 package is installed via Docker so it isn't able to easily generate the report but rather, outputs
useful information to the console.

It is executed using a Powershell script to execute the configuration file through Docker.
