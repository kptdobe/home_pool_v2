CREATE TABLE logger_sensors_temp_heat_pcp_dep(logtime bigint primary key, id varchar(100), temp real);
CREATE INDEX idx_logger_sensors_temp_heat_pcp_dep_logtime ON logger_sensors_temp_heat_pcp_dep(logtime);
CREATE INDEX idx_logger_sensors_temp_heat_pcp_dep_id ON logger_sensors_temp_heat_pcp_dep(id);

CREATE TABLE logger_sensors_temp_heat_pcp_ret(logtime bigint primary key, id varchar(100), temp real);
CREATE INDEX idx_logger_sensors_temp_heat_pcp_ret_logtime ON logger_sensors_temp_heat_pcp_ret(logtime);
CREATE INDEX idx_logger_sensors_temp_heat_pcp_ret_id ON logger_sensors_temp_heat_pcp_ret(id);

CREATE TABLE logger_sensors_temp_heat_pcs_dep(logtime bigint primary key, id varchar(100), temp real);
CREATE INDEX idx_logger_sensors_temp_heat_pcs_dep_logtime ON logger_sensors_temp_heat_pcs_dep(logtime);
CREATE INDEX idx_logger_sensors_temp_heat_pcs_dep_id ON logger_sensors_temp_heat_pcs_dep(id);

CREATE TABLE logger_sensors_temp_heat_pcs_ret(logtime bigint primary key, id varchar(100), temp real);
CREATE INDEX idx_logger_sensors_temp_heat_pcs_ret_logtime ON logger_sensors_temp_heat_pcs_ret(logtime);
CREATE INDEX idx_logger_sensors_temp_heat_pcs_ret_id ON logger_sensors_temp_heat_pcs_ret(id);

CREATE TABLE logger_sensors_temp_heat_pch_dep(logtime bigint primary key, id varchar(100), temp real);
CREATE INDEX idx_logger_sensors_temp_heat_pch_dep_logtime ON logger_sensors_temp_heat_pch_dep(logtime);
CREATE INDEX idx_logger_sensors_temp_heat_pch_dep_id ON logger_sensors_temp_heat_pch_dep(id);

CREATE TABLE logger_sensors_temp_heat_pch_ret(logtime bigint primary key, id varchar(100), temp real);
CREATE INDEX idx_logger_sensors_temp_heat_pch_ret_logtime ON logger_sensors_temp_heat_pch_ret(logtime);
CREATE INDEX idx_logger_sensors_temp_heat_pch_ret_id ON logger_sensors_temp_heat_pch_ret(id);


CREATE TABLE index_gaz(logdate date primary key, index integer);