INSERT INTO party_type (party_type_id, parent_type_id, has_table, description, last_updated_stamp, created_stamp)
VALUES ('AUTOMATED_AGENT', NULL, FALSE, 'Automated Agent', NOW(), NOW());
INSERT INTO party_type (party_type_id, parent_type_id, has_table, description, last_updated_stamp, created_stamp)
VALUES ('PERSON', NULL, TRUE, 'Person', NOW(), NOW());
INSERT INTO status_type (status_type_id, parent_type_id, description, last_updated_stamp, created_stamp)
VALUES ('PARTY_STATUS', NULL, 'Party status', NOW(), NOW());
INSERT INTO status_type (status_type_id, parent_type_id, description, last_updated_stamp, created_stamp)
VALUES ('DELIVERY_REQUEST_STATUS', NULL, 'Delivery request status', NOW(), NOW());

INSERT INTO status_type (status_type_id, parent_type_id, description, last_updated_stamp, created_stamp)
VALUES ('TRIP_STATUS', NULL, 'Trip status', NOW(), NOW());

INSERT INTO status_type (status_type_id, parent_type_id, description, last_updated_stamp, created_stamp)
VALUES ('POINT_STATUS', NULL, 'Point status', NOW(), NOW());

INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('PARTY_ENABLED', 'PARTY_STATUS', 'ENABLED', 0, 'Đã kích hoạt', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('PARTY_DISABLED', 'PARTY_STATUS', 'DISABLED', 1, 'Đã bị vô hiệu hóa', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('DELIVERY_REQUEST_CREATED', 'DELIVERY_REQUEST_STATUS', 'CREATED', 0, 'Delivery request created', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('DELIVERY_REQUEST_ACCEPTED', 'DELIVERY_REQUEST_STATUS', 'ACCEPTED', 1, 'Delivery request accepted', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('DELIVERY_REQUEST_PROCESSING', 'DELIVERY_REQUEST_STATUS', 'PROCESSING', 2, 'Delivery request processing', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('DELIVERY_REQUEST_DELIVERIED', 'DELIVERY_REQUEST_STATUS', 'DELIVERIED', 3, 'Delivery request deliveried', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('DELIVERY_REQUEST_REJECTED', 'DELIVERY_REQUEST_STATUS', 'REJECTED', 3, 'Delivery request rejected', NOW(), NOW());


INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('TRIP_STARTED', 'TRIP_STATUS', 'STARTED', 2, 'Trip processing', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('TRIP_FINISHED', 'TRIP_STATUS', 'FINISHED', 3, 'Trip finished', NOW(), NOW());

INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('POINT_ASSIGNED', 'POINT_STATUS', 'ASSIGNED', 0, 'Assigned point', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('POINT_PROCESSED', 'POINT_STATUS', 'PROCESSED', 1, 'Point processed', NOW(), NOW());

INSERT INTO security_group (group_id, description, last_updated_stamp, created_stamp) VALUES ('ROLE_FULL_ADMIN', 'Full Admin group, has all general functional permissions.', '2017-01-03 10:12:23.994', '2017-01-03 10:12:23.993');
INSERT INTO security_group (group_id, description, last_updated_stamp, created_stamp) VALUES ('ROLE_CUSTOMER', 'Customer group, has all customer`s permissions.', '2017-01-03 10:12:23.994', '2017-01-03 10:12:23.993');
INSERT INTO security_group (group_id, description, last_updated_stamp, created_stamp) VALUES ('ROLE_SHIPPER', 'Shipper group, has all shipper`s permissions.', '2017-01-03 10:12:23.994', '2017-01-03 10:12:23.993');

INSERT INTO party (party_id, user_id, party_type_id, external_id, description, status_id, created_date,  last_modified_date,  is_unread, last_updated_stamp, created_stamp, party_code) VALUES ('bd6322f2-2121-11ea-81a8-979e2f76b5a4','admin', 'PERSON', NULL, NULL, 'PARTY_ENABLED', NULL,  NULL,  FALSE, NOW(), NOW(), 'admin');
INSERT  INTO person (party_id, first_name, middle_name, last_name, gender, birth_date, last_updated_stamp, created_stamp) VALUES ('bd6322f2-2121-11ea-81a8-979e2f76b5a4','admin',',',',','M',NOW(),null,NOW());

INSERT INTO party_security_group (party_id, group_id, last_updated_stamp, created_stamp) VALUES ('bd6322f2-2121-11ea-81a8-979e2f76b5a4', 'ROLE_FULL_ADMIN', NOW(), NOW());