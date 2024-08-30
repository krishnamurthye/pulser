// src/loaders/loadData.js

const fs = require("fs");
const path = require("path");
const { schoolSystem, schoolsList } = require("../models");

let schoolsLists = [];
let isSchoolsListLoaded = false;

async function loadSchoolsList() {
try{
  if (this.isSchoolsListLoaded) {
    console.log("Schools List already loaded.");
    return;
  }

  const filePath = path.join(__dirname, "../../config/schools-list.json");
  schoolsLists = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const school of schoolsLists) {
    console.log(school)
    await schoolsList.findOrCreate({
      where: { id: school.id },
      defaults: {
        name: school.name,
        schoolSystem: school.schoolSystem,
        isActive: school.isActive,
      },
    });
  }
  isSchoolsListLoaded = true;
  console.log("Schools list have been loaded and cached.");
  } catch (error) {
        console.error("Error loading Schools List:", error);
  }
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
try{
  if (this.isSystemListLoaded) {
    console.log(" Schools System already loaded.");
    return;
  }

  const filePath = path.join(__dirname, "../../config/school-system.json");
  schoolSystemLists = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  for (const ss of schoolSystemLists) {
    console.log(ss)
    await schoolSystem.findOrCreate({
      where: { id: ss.id },
      defaults: {
        name: ss.name,
        isActive: ss.isActive,
      },
    });
  }
  isSystemListLoaded = true;
  console.log("Schools System have been loaded and cached.");
  } catch (error) {
      console.error("Error loading Schools System:", error);
    }
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
  isSchoolSystemListInitialized,
};
