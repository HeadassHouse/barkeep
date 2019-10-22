CREATE TABLE IF NOT EXISTS drinks (
  id char(36) NOT NULL,
  name varchar(256) NOT NULL,
  description varchar(256) NOT NULL,
  available boolean NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS  guests(
  id char(36) NOT NULL,
  name char(256) NOT NULL,
  venmo char(256) NOT NULL,
  drinkCount int(16) NOT NULL,
  PRIMARY KEY (id)
);
