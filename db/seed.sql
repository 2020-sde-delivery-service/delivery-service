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

INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('PARTY_ENABLED', 'PARTY_STATUS', 'ENABLED', 0, 'Đã kích hoạt', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('PARTY_DISABLED', 'PARTY_STATUS', 'DISABLED', 1, 'Đã bị vô hiệu hóa', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('DELIVERY_REQUEST_CREATED', 'DELIVERY_REQUEST_STATUS', 'CREATED', 0, 'Delivery request created', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('DELIVERY_REQUEST_ACCEPTED', 'DELIVERY_REQUEST_STATUS', 'ACCEPTED', 1, 'Delivery request accepted', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('DELIVERY_REQUEST_PROCESSING', 'DELIVERY_REQUEST_STATUS', 'PROCESSING', 2, 'Delivery request processing', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('DELIVERY_REQUEST_DELIVERIED', 'DELIVERY_REQUEST_STATUS', 'DELIVERIED', 3, 'Delivery request deliveried', NOW(), NOW());

INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('TRIP_CREATED', 'TRIP_STATUS', 'CREATED', 0, 'Trip request created', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('TRIP_ACCEPTED', 'TRIP_STATUS', 'ACCEPTED', 1, 'Trip request accepted', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('TRIP_PROCESSING', 'TRIP_STATUS', 'PROCESSING', 2, 'Trip request processing', NOW(), NOW());
INSERT INTO status (status_id, status_type_id, status_code, sequence_id, description, last_updated_stamp, created_stamp) VALUES ('TRIP_DELIVERIED', 'TRIP_STATUS', 'DELIVERIED', 3, 'Trip request deliveried', NOW(), NOW());

INSERT INTO security_group (group_id, description, last_updated_stamp, created_stamp) VALUES ('ROLE_FULL_ADMIN', 'Full Admin group, has all general functional permissions.', '2017-01-03 10:12:23.994', '2017-01-03 10:12:23.993');
INSERT INTO security_group (group_id, description, last_updated_stamp, created_stamp) VALUES ('ROLE_CUSTOMER', 'Customer group, has all customer`s permissions.', '2017-01-03 10:12:23.994', '2017-01-03 10:12:23.993');
INSERT INTO security_group (group_id, description, last_updated_stamp, created_stamp) VALUES ('ROLE_SHIPPER', 'Shipper group, has all shipper`s permissions.', '2017-01-03 10:12:23.994', '2017-01-03 10:12:23.993');

INSERT INTO party (party_id, party_type_id, external_id, description, status_id, created_date, created_by_user_login, last_modified_date, last_modified_by_user_login, is_unread, last_updated_stamp, created_stamp, party_code) VALUES ('bd6322f2-2121-11ea-81a8-979e2f76b5a4', 'PERSON', NULL, NULL, 'PARTY_ENABLED', NULL, NULL, NULL, NULL, FALSE, NOW(), NOW(), 'admin');
INSERT  INTO person (party_id, first_name, middle_name, last_name, gender, birth_date, last_updated_stamp, created_stamp) VALUES ('bd6322f2-2121-11ea-81a8-979e2f76b5a4','admin',',',',','M',NOW(),null,NOW());
INSERT INTO user_login (user_login_id, current_password, is_system, enabled, last_updated_stamp, created_stamp, party_id) VALUES ( 'admin', '$2a$04$cqFXgdkB.8u2HwT3QUTVZuePtHdzi.rWFCjdgNbVB7l6vn/yAU7F6',  FALSE, TRUE,  NOW(), NOW(), 'bd6322f2-2121-11ea-81a8-979e2f76b5a4');
INSERT INTO user_login_security_group (user_login_id, group_id, last_updated_stamp, created_stamp) VALUES ('admin', 'ROLE_FULL_ADMIN', NOW(), NOW());