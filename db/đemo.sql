INSERT INTO party (party_id, party_type_id, external_id, description, status_id, created_date, created_by_user_login, last_modified_date, last_modified_by_user_login, is_unread, last_updated_stamp, created_stamp, party_code) VALUES ('7716ddc2-444b-11eb-8e28-eb296573f10a', 'PERSON', NULL, NULL, 'PARTY_ENABLED', NULL, NULL, NULL, NULL, FALSE, NOW(), NOW(), 'customer');
INSERT  INTO person (party_id, first_name, middle_name, last_name, gender, birth_date, last_updated_stamp, created_stamp) VALUES ('7716ddc2-444b-11eb-8e28-eb296573f10a','Customer',',',',','M',NOW(),null,NOW());
INSERT INTO user_login (user_login_id, current_password, is_system, enabled, last_updated_stamp, created_stamp, party_id) VALUES ( 'customer', '$2a$04$cqFXgdkB.8u2HwT3QUTVZuePtHdzi.rWFCjdgNbVB7l6vn/yAU7F6',  FALSE, TRUE,  NOW(), NOW(), '7716ddc2-444b-11eb-8e28-eb296573f10a');
INSERT INTO user_login_security_group (user_login_id, group_id, last_updated_stamp, created_stamp) VALUES ('customer', 'ROLE_CUSTOMER', NOW(), NOW());


INSERT INTO party (party_id, party_type_id, external_id, description, status_id, created_date, created_by_user_login, last_modified_date, last_modified_by_user_login, is_unread, last_updated_stamp, created_stamp, party_code) VALUES ('047736da-444c-11eb-8e29-4bb855f555ac', 'PERSON', NULL, NULL, 'PARTY_ENABLED', NULL, NULL, NULL, NULL, FALSE, NOW(), NOW(), 'shipper');
INSERT  INTO person (party_id, first_name, middle_name, last_name, gender, birth_date, last_updated_stamp, created_stamp) VALUES ('047736da-444c-11eb-8e29-4bb855f555ac','shipper',',',',','M',NOW(),null,NOW());
INSERT INTO user_login (user_login_id, current_password, is_system, enabled, last_updated_stamp, created_stamp, party_id) VALUES ( 'shipper', '$2a$04$cqFXgdkB.8u2HwT3QUTVZuePtHdzi.rWFCjdgNbVB7l6vn/yAU7F6',  FALSE, TRUE,  NOW(), NOW(), '047736da-444c-11eb-8e29-4bb855f555ac');
INSERT INTO user_login_security_group (user_login_id, group_id, last_updated_stamp, created_stamp) VALUES ('shipper', 'ROLE_SHIPPER', NOW(), NOW());
INSERT INTO shipper (shipper_id, current_location, last_updated_stamp, created_stamp) VALUES ('047736da-444c-11eb-8e29-4bb855f555ac', '21.000389, 105.810476', NOW(), NOW());
