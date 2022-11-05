-- Cascade drop tables and referenced tables
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS related CASCADE;
DROP TABLE IF EXISTS skus CASCADE;

CREATE TABLE products (
  "id" INT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slogan" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "default_price" TEXT NOT NULL
);

CREATE TABLE styles (
  "id" INT NOT NULL PRIMARY KEY,
  "product_id" INT NOT NULL REFERENCES products(id),
  "name" TEXT,
  "sale_price" TEXT,
  "original_price" TEXT,
  "default_style" INT
);

CREATE TABLE features (
  "id" INT NOT NULL PRIMARY KEY,
  "product_id" INT NOT NULL REFERENCES products(id),
  "feature" TEXT NOT NULL,
  "value" TEXT NOT NULL
);

CREATE TABLE photos (
  "id" INT NOT NULL PRIMARY KEY,
  "style_id" INT NOT NULL REFERENCES styles(id),
  "url" TEXT NOT NULL,
  "thumbnail_url" TEXT NOT NULL
);

CREATE TABLE related (
  "id" INT NOT NULL PRIMARY KEY,
  "product_id" INT NOT NULL REFERENCES products(id),
  "related_product_id" INT NOT NULL
);

CREATE TABLE skus (
  "id" INT NOT NULL PRIMARY KEY,
  "style_id" INT NOT NULL REFERENCES styles(id),
  "size" TEXT,
  "quantity" INT
);



