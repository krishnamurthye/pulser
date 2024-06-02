// src/loaders/loadData.js

const fs = require('fs');
const path = require('path');
const { schoolSystem, schoolsList } = require('../models');

let schoolsLists = [];
let isSchoolsListLoaded = false;

async function loadSchoolsList() {
  const filePath = path.join(__dirname, '../../config/schools-list.json');
  schoolsLists = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const school of schoolsLists) {
    await schoolsList.findOrCreate({
      where: { id: school.id },
      defaults: {
        name: school.name,
        schoolSystem: school.schoolSystem,
        isActive: school.isActive
      }
    });
  }
  isSchoolsListLoaded = true;
}

function getSchoolLists() {
  return schoolsLists;
}

function isSchoolsListInitialized() {
  return isSchoolsListLoaded;
}


let schoolSystemLists = [];
let isSystemListLoaded = false;


async function loadSchoolsSystem() {
  const filePath = path.join(__dirname, '../../config/school-system.json');
  schoolSystemLists = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  console.log("loadSchoolsSystem:schoolSystemLists", schoolSystemLists);
  for (const ss of schoolSystemLists) {
    await schoolSystem.findOrCreate({
      where: { id: ss.id },
      defaults: {
        name: ss.name,
        isActive: ss.isActive
      }
    });
  }
  isSystemListLoaded = true;
}

function getSchoolSystemLists() {
  return schoolSystemLists;
}

function isSchoolSystemListInitialized() {
  return isSystemListLoaded;
}

module.exports = {
  loadSchoolsList,
  loadSchoolsSystem,
  getSchoolLists,
  getSchoolSystemLists,
  isSchoolsListInitialized,
  isSchoolSystemListInitialized
};