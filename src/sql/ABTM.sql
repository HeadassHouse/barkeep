CREATE TABLE IF NOT EXISTS drinks (
  id char(36) NOT NULL,
  name varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  available boolean NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS guests (
  id char(36) NOT NULL,
  name char(255) NOT NULL,
  venmo char(255) NOT NULL,
  drinkCount int(16) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS orders(
  id char(36) NOT NULL,
  name char(255) NOT NULL,
  drink char(255) NOT NULL,
  fulfilled boolean NOT NULL,
  orderDate TIME(0) NOT NULL,
  PRIMARY KEY (id)
);
