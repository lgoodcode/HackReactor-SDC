#!/bin/sh

# Reset tables
echo "Resetting tables..."
sudo -u postgres psql -d sdc -f "/usr/src/app/reset.sql"

echo "Creating tables..."
psql -U $POSTGRES_USER -d $POSTGRES_DB -f reset.sql

echo "Importing products data..."
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\copy products FROM '/usr/src/app/data/product.csv' DELIMITER ',' CSV HEADER;"

echo "Importing styles data..."
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\copy styles FROM '/usr/src/app/data/styles.csv' DELIMITER ',' CSV HEADER;"

echo 'Importing features data...'
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\copy features FROM '/usr/src/app/data/features.csv' DELIMITER ',' CSV HEADER;" &

echo 'Importing related data...'
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\copy related FROM '/usr/src/app/data/related.csv' DELIMITER ',' CSV HEADER;" &

echo 'Importing photos data...'
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\copy photos FROM '/usr/src/app/data/photos.csv' DELIMITER ',' CSV HEADER;" &

echo 'Importing skus data...'
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "\copy skus FROM '/usr/src/app/data/skus.csv' DELIMITER ',' CSV HEADER;" &

wait # Wait for all background jobs to finish
echo 'Done!'
