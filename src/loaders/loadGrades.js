const fs = require("fs");
const path = require("path");
const { grades } = require("../models");

let gradesList;
let isLoaded = false;

 // Method to load grades levels from the JSON file into the database
 async function loadGrades() {
  try {
    // Prevent reloading if already loaded
    if (isLoaded) {
      console.log("gradesList already loaded.");
      return;
    }

    // Load the JSON file containing grades levels
    const filePath = path.join(__dirname, "../../config/grades-list.json"); // Adjust the path if necessary
    gradesList = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log("gradesList ->", gradesList);

    // Insert levels into the database if they don't already exist
    for (const level of gradesList) {
      await grades.findOrCreate({
        where: { id: level.id },
        defaults: {
          name: level.name,
        },
      });
    }

    // Cache the levels locally
    isLoaded = true;
    console.log("gradesList have been loaded and cached.");
  } catch (error) {
    console.error("Error loading grades:", error);
  }
}


async function getGrades() {
  await loadGrades();
  return gradesList;
}

function isGradesInitialized() {
  return isLoaded;
}

module.exports = { loadGrades, getGrades, isGradesInitialized };
