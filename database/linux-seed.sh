#!/bin/sh

echo "Importing products data..."
sudo -u postgres psql -d sdc -c "\copy products FROM './product.csv' DELIMITER ',' CSV HEADER;"

echo "Importing styles data..."
sudo -u postgres psql -d sdc -c "\copy styles FROM './styles.csv' DELIMITER ',' CSV HEADER;"

echo 'Importing features data...'
sudo -u postgres psql -d sdc -c "\copy features FROM './features.csv' DELIMITER ',' CSV HEADER;" &

echo 'Importing related data...'
sudo -u postgres psql -d sdc -c "\copy related FROM './related.csv' DELIMITER ',' CSV HEADER;" &

echo 'Importing photos data...'
sudo -u postgres psql -d sdc -c "\copy photos FROM './photos.csv' DELIMITER ',' CSV HEADER;" &

echo 'Importing skus data...'
sudo -u postgres psql -d sdc -c "\copy skus FROM './skus.csv' DELIMITER ',' CSV HEADER;" &

wait # Wait for all background jobs to finish
echo 'Done!'
