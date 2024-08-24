// Importing loader functions from different files
const schools = require('./loadData');
const education = require('./loadEducation');
const roles = require('./loadRoles');
const specialization = require('./loadSpecialization');
const needLevels = require('./loadNeedLevel');
const grades = require('./loadGrades');

// Exporting all loader functions in a single object
module.exports = {
  // Education functions
  loadEducation: education.loadEducation,
  getEducationList: education.getEducationList,
  isEducationListInitialized: education.isEducationListInitialized,

  // Schools functions
  loadSchoolsList: schools.loadSchoolsList,
  loadSchoolsSystem: schools.loadSchoolsSystem,
  getSchoolLists: schools.getSchoolLists,
  getSchoolSystemLists: schools.getSchoolSystemLists,
  isSchoolsListInitialized: schools.isSchoolsListInitialized,
  isSchoolSystemListInitialized: schools.isSchoolSystemListInitialized,

  // User Roles functions
  loadUserRoles: roles.loadUserRoles,
  getUserRoles: roles.getUserRoles,

  // Specialization functions
  loadSpecialization: specialization.loadSpecialization,
  getSpecializations: specialization.getSpecializations,
  isInitialized: specialization.isInitialized,

  // Need Levels functions
  loadNeedLevels: needLevels.loadNeedLevels,
  getNeedLevels: needLevels.getNeedLevels,
  isNeedLevelsInitialized: needLevels.isNeedLevelsInitialized,

  // Grades functions
  loadGrades: grades.loadGrades,
  getGrades: grades.getGrades,
  isGradesInitialized: grades.isGradesInitialized
};
