/**
 * Some string with query
 * It's to assemble them into some scenario
 */

// the foreign key check
const disableForeignKeyCheck = "SET foreign_key_checks = 0";
const enableForeignKeyCheck = "SET foreign_key_checks = 1";

// all the truncate
const truncateMarker = "TRUNCATE TABLE marker";
const truncateMarkerType = "TRUNCATE TABLE marker_type";
const truncateUser = "TRUNCATE TABLE user";
const truncateRole = "TRUNCATE TABLE role";
const truncateMarkerOption = "TRUNCATE TABLE marker_option";
const truncateMarkerMarkerOption = "TRUNCATE TABLE marker_marker_options_marker_option"

// some insert
// role
const insertRoleSimpleUser = "INSERT INTO `role` (`id`, `code`, `label`) VALUES (NULL, '1', 'simple-user')";
const insertRoleModo = "INSERT INTO `role` (`id`, `code`, `label`) VALUES (NULL, '2', 'modo')";
const insertRoleAdmin = "INSERT INTO `role` (`id`, `code`, `label`) VALUES (NULL, '3', 'admin')";
// marker type
const insertMarkerTypePort = "INSERT INTO `marker_type` (`id`, `code`, `label`) VALUES (NULL, '1', 'Port')";
const insertMarkerTypeView = "INSERT INTO `marker_type` (`id`, `code`, `label`) VALUES (NULL, '2', 'View')";
// one admin user, password is jeMeNoie
const insertOneAdminUser = "INSERT INTO `user` (`id`, `email`, `name`, `password`, `roleId`) VALUES (NULL, 'samy@amarrons.eu', 'Samy', '$2b$12$aFdl4OEnvXw23Up5uVugvOJ8MxNNVJbeMwU6D7/ookop3InW.ZKEm', 3)";
// some marker
const insertMarkerCinquantenaire = "INSERT INTO `marker` (`id`, `label`, `markerTypeId`, `lat`, `lng`) VALUES (NULL, 'Cinquantenaire', '1', '50.840255', '4.394491');";
// some marker option
const insertMarkerOptionWaterSupply = "INSERT INTO `marker_option` (`id`, `code`, `label`) VALUES (NULL, '1', 'Water supply')";
const insertMarkerOptionDrain = "INSERT INTO `marker_option` (`id`, `code`, `label`) VALUES (NULL, '2', 'Drain')";
// some link between marker and marker option
const insertLinkMarkerMarkerOptionOneOne = "INSERT INTO `marker_marker_options_marker_option` (`markerId`, `markerOptionId`) VALUES ('1', '2');"

export const fullInDbForDevMode = [
  disableForeignKeyCheck,
  truncateMarker,
  truncateMarkerType,
  truncateUser,
  truncateRole,
  truncateMarkerOption,
  truncateMarkerMarkerOption,
  insertRoleSimpleUser,
  insertRoleModo,
  insertRoleAdmin,
  insertMarkerTypePort,
  insertMarkerTypeView,
  insertOneAdminUser,
  insertMarkerCinquantenaire,
  insertMarkerOptionWaterSupply,
  insertMarkerOptionDrain,
  insertLinkMarkerMarkerOptionOneOne,
  enableForeignKeyCheck
];