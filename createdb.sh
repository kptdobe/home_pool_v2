#!/bin/bash

sqlite3 home.db 'DROP TABLE logger_sensors;'
sqlite3 home.db 'CREATE TABLE logger_sensors(time bigint primary key, id string, value real);'

