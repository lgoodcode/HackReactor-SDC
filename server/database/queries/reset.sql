-- Cascade drop tables and referenced tables
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS style CASCADE;
DROP TABLE IF EXISTS feature CASCADE;
DROP TABLE IF EXISTS photo CASCADE;
DROP TABLE IF EXISTS related CASCADE;
DROP TABLE IF EXISTS sku CASCADE;

CREATE TABLE product (
  "id" INT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slogan" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "default_price" INT NOT NULL
);

CREATE TABLE style (
  "id" INT NOT NULL PRIMARY KEY,
  "product_id" INT NOT NULL REFERENCES product(id),
  "name" TEXT,
  "sale_price" INT,
  "original_price" INT,
  "default_style" INT
);

CREATE TABLE feature (
  "id" INT NOT NULL PRIMARY KEY,
  "product_id" INT NOT NULL REFERENCES product(id),
  "feature" TEXT NOT NULL,
  "value" TEXT NOT NULL
);

CREATE TABLE photo (
  "id" INT NOT NULL PRIMARY KEY,
  "style_id" INT NOT NULL REFERENCES style(id),
  "url" TEXT NOT NULL,
  "thumbnail_url" TEXT NOT NULL
);

CREATE TABLE related (
  "id" INT NOT NULL PRIMARY KEY,
  "product_id" INT NOT NULL REFERENCES product(id),
  "related_product_id" INT NOT NULL
);

CREATE TABLE sku (
  "id" INT NOT NULL PRIMARY KEY,
  "style_id" INT NOT NULL REFERENCES style(id),
  "size" TEXT,
  "quantity" INT
);



