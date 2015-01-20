#!/bin/bash

#sqlite3 home.db 'DROP TABLE logger_sensors;'
#sqlite3 home.db 'CREATE TABLE logger_sensors(time bigint primary key, id string, value real);'

#sqlite3 home.db 'CREATE INDEX idx_logger_sensors_time ON logger_sensors(time)'
#sqlite3 home.db 'CREATE INDEX idx_logger_sensors_id ON logger_sensors(id)'

sqlite3 home.db 'CREATE TABLE logger_sensors_pool(time bigint primary key, id string, value real);'
sqlite3 home.db 'CREATE TABLE logger_sensors_garage(time bigint primary key, id string, value real);'

sqlite3 home.db 'CREATE INDEX idx_logger_sensors_pool_time ON logger_sensors_pool(time)'
sqlite3 home.db 'CREATE INDEX idx_logger_sensors_pool_id ON logger_sensors_pool(id)'
sqlite3 home.db 'CREATE INDEX idx_logger_sensors_garage_time ON logger_sensors_garage(time)'
sqlite3 home.db 'CREATE INDEX idx_logger_sensors_garage_id ON logger_sensors_garage(id)'

sqlite3 home.db 'INSERT INTO logger_sensors_pool SELECT * FROM logger_sensors WHERE id="/api/pool/temp"'
sqlite3 home.db 'INSERT INTO logger_sensors_garage SELECT * FROM logger_sensors WHERE id="/api/garage/temp"'
