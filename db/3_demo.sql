-- demo data  new
INSERT INTO party (party_id,user_id, party_type_id, external_id, description, status_id, created_date,  last_modified_date, is_unread, last_updated_stamp, created_stamp, party_code) VALUES ('7716ddc2-444b-11eb-8e28-eb296573f10a', 'customer','PERSON', NULL, NULL, 'PARTY_ENABLED', NULL, NULL, FALSE, NOW(), NOW(), 'customer');
INSERT  INTO person (party_id, first_name, middle_name, last_name, gender, birth_date, last_updated_stamp, created_stamp) VALUES ('7716ddc2-444b-11eb-8e28-eb296573f10a','Customer',',',',','M',NOW(),null,NOW());
INSERT INTO party_security_group (party_id, group_id, last_updated_stamp, created_stamp) VALUES ('7716ddc2-444b-11eb-8e28-eb296573f10a', 'ROLE_CUSTOMER', NOW(), NOW());
INSERT INTO customer (customer_id, current_location, last_updated_stamp, created_stamp) VALUES ('7716ddc2-444b-11eb-8e28-eb296573f10a', '21.000389, 105.810476', NOW(), NOW());

INSERT INTO party (party_id,user_id, party_type_id, external_id, description, status_id, created_date,  last_modified_date,  is_unread, last_updated_stamp, created_stamp, party_code) VALUES ('047736da-444c-11eb-8e29-4bb855f555ac','shipper', 'PERSON', NULL, NULL, 'PARTY_ENABLED', NULL, NULL,  FALSE, NOW(), NOW(), 'shipper');
INSERT  INTO person (party_id, first_name, middle_name, last_name, gender, birth_date, last_updated_stamp, created_stamp) VALUES ('047736da-444c-11eb-8e29-4bb855f555ac','shipper',',',',','M',NOW(),null,NOW());
INSERT INTO party_security_group (party_id, group_id, last_updated_stamp, created_stamp) VALUES ('047736da-444c-11eb-8e29-4bb855f555ac', 'ROLE_SHIPPER', NOW(), NOW());
INSERT INTO shipper (shipper_id, current_location, last_updated_stamp, created_stamp) VALUES ('047736da-444c-11eb-8e29-4bb855f555ac', '21.000389, 105.810476', NOW(), NOW());
