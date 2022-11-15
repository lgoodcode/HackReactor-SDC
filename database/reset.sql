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
  "productId" INT NOT NULL REFERENCES products(id),
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
  "styleId" INT NOT NULL REFERENCES styles(id),
  "url" TEXT NOT NULL,
  "thumbnail_url" TEXT NOT NULL
);

CREATE TABLE related (
  "id" INT NOT NULL PRIMARY KEY,
  "current_product_id" INT NOT NULL REFERENCES products(id),
  "related_product_id" INT NOT NULL
);

CREATE TABLE skus (
  "id" INT NOT NULL PRIMARY KEY,
  "styleId" INT NOT NULL REFERENCES styles(id),
  "size" TEXT,
  "quantity" INT
);

-- Indexes used for faster queries
CREATE INDEX idx_product_id ON features("product_id");
CREATE INDEX idx_styles_id ON styles("productId");
CREATE INDEX idx_features_id ON features("product_id");
CREATE INDEX idx_photos_id ON photos("styleId");
CREATE INDEX idx_related_id ON related("current_product_id");
CREATE INDEX idx_skus_id ON skus("styleId");

