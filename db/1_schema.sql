
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
	  party_code                  VARCHAR(255),
	  user_id 					  VARCHAR(255),	--chat_id
	  party_type_id               VARCHAR(60),
	  external_id                 VARCHAR(60),
	  description                 TEXT,
	  status_id                   VARCHAR(60),
	  created_date                TIMESTAMP   NULL,
	  last_modified_date          TIMESTAMP   NULL,
	  is_unread                   BOOLEAN,
	  last_updated_stamp          TIMESTAMP   ,
	  created_stamp               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  
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


CREATE TABLE security_group (
	  group_id           VARCHAR(60) NOT NULL,
	  description        TEXT,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_security_group PRIMARY KEY (group_id)
);

CREATE TABLE party_security_group (
	  party_id      UUID NOT NULL,
	  group_id           VARCHAR(60)  NOT NULL,
	  last_updated_stamp TIMESTAMP    ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_party_security_group PRIMARY KEY (party_id, group_id),
	  CONSTRAINT user_secgrp_grp FOREIGN KEY (group_id) REFERENCES security_group (group_id),
	  CONSTRAINT user_secgrp_user FOREIGN KEY (party_id) REFERENCES party (party_id)
);

CREATE TABLE shipper (
	  shipper_id   UUID NOT NULL , -- party_id
	  current_location      VARCHAR(255) NOT NULL,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_shipper PRIMARY KEY (shipper_id),
	  CONSTRAINT fk_shipper_party FOREIGN KEY (shipper_id) REFERENCES party (party_id)
);
CREATE TABLE customer (
	  customer_id   UUID NOT NULL , --  party_id
	  current_location      VARCHAR(255) NOT NULL,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_customer PRIMARY KEY (customer_id),
	  CONSTRAINT fk_customer_party FOREIGN KEY (customer_id) REFERENCES party (party_id)
);

CREATE TABLE delivery_request (
	  delivery_request_id   UUID NOT NULL default uuid_generate_v1(),
	  pickup_address      VARCHAR(255) NOT NULL,
	  delivery_address      VARCHAR(255) NOT NULL,
	  quantity			NUMERIC,
	  weight			NUMERIC,
	  unit				VARCHAR(60),
	  customer_phone_number VARCHAR(60),
	  assigned_shipper_id UUID,
	  customer_id UUID NOT NULL, -- customer_id
	  pickup_location  VARCHAR(60),
	  delivery_location VARCHAR(60),
	  status_id        VARCHAR(60) NOT NULL,
	  created_date     TIMESTAMP   NOT NULL,
	  last_modified_date  TIMESTAMP   NULL,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_delivery_request PRIMARY KEY (delivery_request_id),
	  CONSTRAINT fk_delivery_request_status FOREIGN KEY (status_id) REFERENCES status (status_id),
	  CONSTRAINT fk_delivery_request_shipper FOREIGN KEY (assigned_shipper_id) REFERENCES shipper (shipper_id),
	  CONSTRAINT fk_delivery_request_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);


CREATE TABLE trip (
	  trip_id   UUID NOT NULL ,
	  created_date      DATE NOT NULL,
	  current_finished_seq_id NUMERIC NOT NULL default 0,
	  start_date      DATE,
	  shipper_id 	UUID NOT NULL,
	  end_date      DATE,
	  status_id        VARCHAR(60) NOT NULL,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_trip PRIMARY KEY (trip_id),
	  CONSTRAINT fk_trip_status FOREIGN KEY (status_id) REFERENCES status (status_id),
	  CONSTRAINT fk_trip_shipper FOREIGN KEY (shipper_id) REFERENCES shipper (shipper_id)
);

CREATE TABLE point (
	  point_id UUID NOT NULL default uuid_generate_v1(),	
	  trip_id   UUID ,
	  seq_id   NUMERIC,
	  suggestion_seq_id   NUMERIC,
	  delivery_request_id UUID NOT NULL,
	  request_type VARCHAR(60) NOT NULL, -- pickup/ delivery
	  lat	NUMERIC NOT NULL,
	  lng 	NUMERIC NOT NULL,
	  assign_time      DATE NOT NULL,
	  status_id        VARCHAR(60) NOT NULL,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_point PRIMARY KEY (point_id),
	  CONSTRAINT fk_point_status FOREIGN KEY (status_id) REFERENCES status (status_id),
	  CONSTRAINT fk_point_trip FOREIGN KEY (trip_id) REFERENCES trip (trip_id),
	  CONSTRAINT fk_point_delivery_request FOREIGN KEY (delivery_request_id) REFERENCES delivery_request (delivery_request_id)
);

CREATE TABLE configuration (
	  property_id   VARCHAR(60) NOT NULL ,
	  value      VARCHAR(255) NOT NULL,
	  last_updated_stamp TIMESTAMP   ,
	  created_stamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  CONSTRAINT pk_configuration PRIMARY KEY (property_id)
);

