delete from logger_sensors_garage where temp <= 0 or temp > 80;
delete from logger_sensors_pool where temp <= 0 or temp > 80;
delete from logger_sensors_temp_heat_pch_dep where temp <= 0 or temp > 80;
delete from logger_sensors_temp_heat_pch_ret where temp <= 0 or temp > 80;
delete from logger_sensors_temp_heat_pcp_dep where temp <= 0 or temp > 80;
delete from logger_sensors_temp_heat_pcp_ret where temp <= 0 or temp > 80;
delete from logger_sensors_temp_heat_pcs_dep where temp <= 0 or temp > 80;
delete from logger_sensors_temp_heat_pcs_ret where temp <= 0 or temp > 80;
