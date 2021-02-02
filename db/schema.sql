
CREATE TABLE status_type (
	  status_type_id     VARCHAR(60) NOT NULL,
	  parent_type_id     VARCHAR(60),
	  description        TEXT,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_status_type PRIMARY KEY (status_type_id),
	  CONSTRAINT status_type_parent FOREIGN KEY (parent_type_id) REFERENCES status_type (status_type_id)
);
CREATE TABLE status (
	  status_id          VARCHAR(60) NOT NULL,
	  status_type_id     VARCHAR(60),
	  status_code        VARCHAR(60),
	  sequence_id        VARCHAR(60),
	  description        TEXT,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_status PRIMARY KEY (status_id),
	  CONSTRAINT status_to_type FOREIGN KEY (status_type_id) REFERENCES status_type (status_type_id)
);
CREATE TABLE party_type (
	  party_type_id      VARCHAR(60) NOT NULL,
	  parent_type_id     VARCHAR(60),
	  has_table          BOOLEAN,
	  description        TEXT,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_party_type PRIMARY KEY (party_type_id),
	  CONSTRAINT party_type_par FOREIGN KEY (parent_type_id) REFERENCES party_type (party_type_id)
);
CREATE TABLE party (
	  party_id                    UUID NOT NULL default uuid_generate_v1(),
	  party_type_id               VARCHAR(60),
	  external_id                 VARCHAR(60),
	  description                 TEXT,
	  status_id                   VARCHAR(60),
	  created_date                TIMESTAMP   NULL,
	  created_by_user_login       VARCHAR(255),
	  last_modified_date          TIMESTAMP   NULL,
	  last_modified_by_user_login VARCHAR(255),
	  is_unread                   BOOLEAN,
	  last_updated_stamp          TIMESTAMP   ,
	  created_stamp               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  party_code                  VARCHAR(255),
	  CONSTRAINT pk_party PRIMARY KEY (party_id),
	  CONSTRAINT party_statusitm FOREIGN KEY (status_id) REFERENCES status (status_id),
	  CONSTRAINT party_pty_typ FOREIGN KEY (party_type_id) REFERENCES party_type (party_type_id)
);
CREATE TABLE person (
	  party_id                    UUID              NOT NULL,
	  first_name                  VARCHAR(100),
	  middle_name                 VARCHAR(100),
	  last_name                   VARCHAR(100),
	  gender                      CHARACTER(1),
	  birth_date                  DATE,
	  last_updated_stamp          TIMESTAMP                NULL,
	  created_stamp               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_person PRIMARY KEY (party_id),
	  CONSTRAINT person_party FOREIGN KEY (party_id) REFERENCES party (party_id)
);

CREATE TABLE user_login (
	  user_login_id            VARCHAR(255)  NOT NULL,
	  current_password         VARCHAR(60),
	  is_system                BOOLEAN,
	  enabled                  BOOLEAN,
	  last_updated_stamp       TIMESTAMP     ,
	  created_stamp            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  party_id                 UUID,
	  CONSTRAINT pk_user_login PRIMARY KEY (user_login_id),
	  CONSTRAINT user_party FOREIGN KEY (party_id) REFERENCES party (party_id)
);

ALTER TABLE party
  ADD CONSTRAINT party_m_user_login FOREIGN KEY (last_modified_by_user_login) REFERENCES user_login (user_login_id);
ALTER TABLE party
  ADD CONSTRAINT party_c_user_login FOREIGN KEY (created_by_user_login) REFERENCES user_login (user_login_id);

CREATE TABLE security_group (
	  group_id           VARCHAR(60) NOT NULL,
	  description        TEXT,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_security_group PRIMARY KEY (group_id)
);

CREATE TABLE user_login_security_group (
	  user_login_id      VARCHAR(255) NOT NULL,
	  group_id           VARCHAR(60)  NOT NULL,
	  last_updated_stamp TIMESTAMP    ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_user_login_security_group PRIMARY KEY (user_login_id, group_id),
	  CONSTRAINT user_secgrp_grp FOREIGN KEY (group_id) REFERENCES security_group (group_id),
	  CONSTRAINT user_secgrp_user FOREIGN KEY (user_login_id) REFERENCES user_login (user_login_id)
);
--This part is nice to have.

CREATE TABLE delivery_request (
	  delivery_request_id   UUID NOT NULL default uuid_generate_v1(),
	  pickup_address      VARCHAR(255) NOT NULL,
	  delivery_address      VARCHAR(255) NOT NULL,
	  unit				VARCHAR(60),
	  customer_phone_number VARCHAR(60),
	  pickup_location  VARCHAR(60),
	  delivery_location VARCHAR(60),
	  status_id        VARCHAR(60),
	  created_date     TIMESTAMP   NULL,
	  last_modified_date  TIMESTAMP   NULL,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_delivery_request PRIMARY KEY (delivery_request_id),
	  CONSTRAINT fk_delivery_request_status FOREIGN KEY (status_id) REFERENCES status (status_id)
);

CREATE TABLE shipper (
	  shipper_id   UUID NOT NULL ,
	  current_location      VARCHAR(255) NOT NULL,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_shipper PRIMARY KEY (shipper_id),
	  CONSTRAINT fk_shipper_party FOREIGN KEY (shipper_id) REFERENCES party (party_id)
);

CREATE TABLE shipper (
	  shipper_id   UUID NOT NULL ,
	  current_location      VARCHAR(255) NOT NULL,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_shipper PRIMARY KEY (shipper_id),
	  CONSTRAINT fk_shipper_party FOREIGN KEY (shipper_id) REFERENCES party (party_id)
);


CREATE TABLE trip (
	  trip_id   UUID NOT NULL ,
	  created_date      DATE NOT NULL,
	  start_date      DATE,
	  end_date      DATE,
	  status_id        VARCHAR(60),
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_trip PRIMARY KEY (trip_id),
	  CONSTRAINT fk_trip_status FOREIGN KEY (status_id) REFERENCES status (status_id)
);

CREATE TABLE point (
	  trip_id   UUID NOT NULL ,
	  seq_id   NUMERIC,
	  request_id UUID,
	  type VARCHAR(60),
	  lat	NUMERIC,
	  long 	NUMERIC,
	  assign_time      DATE,
	  status_id        VARCHAR(60),
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_point PRIMARY KEY (trip_id,seq_id),
	  CONSTRAINT fk_point_status FOREIGN KEY (status_id) REFERENCES status (status_id),
	  CONSTRAINT fk_point_delivery_request FOREIGN KEY (trip_id) REFERENCES trip (trip_id)
);

CREATE TABLE configuration (
	  property_id   VARCHAR(60) NOT NULL ,
	  value      VARCHAR(255) NOT NULL,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_configuration PRIMARY KEY (property_id)
);

