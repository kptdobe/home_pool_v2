#!/bin/bash

sqlite3 home.db 'DROP TABLE logger_sensors;'
sqlite3 home.db 'CREATE TABLE logger_sensors(time bigint primary key, id string, value real);'

sqlite3 home.db 'CREATE INDEX idx_logger_sensors_time ON logger_sensors(time)'
sqlite3 home.db 'CREATE INDEX idx_logger_sensors_id ON logger_sensors(id)'

