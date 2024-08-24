const fs = require("fs");
const path = require("path");
const { needLevel } = require("../models");

let needLevelList;
let isLoaded = false;

 // Method to load need levels from the JSON file into the database
 async function loadNeedLevels() {
  try {
    // Prevent reloading if already loaded
    if (this.isLoaded) {
      console.log("Need levels already loaded.");
      return;
    }

    // Load the JSON file containing need levels
    const filePath = path.join(__dirname, "../../config/need-levels-list.json"); // Adjust the path if necessary
    needLevelList = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log("Need Levels ->", needLevelList);

    // Insert levels into the database if they don't already exist
    for (const level of needLevelList) {
      await needLevel.findOrCreate({
        where: { id: level.id },
        defaults: {
          name: level.name,
        },
      });
    }

    // Cache the levels locally
    this.isLoaded = true;
    console.log("Need levels have been loaded and cached.");
  } catch (error) {
    console.error("Error loading need levels:", error);
  }
}


async function getNeedLevels() {
  await loadNeedLevels();
  return needLevelList;
}

function isNeedLevelsInitialized() {
  return isLoaded;
}

module.exports = { loadNeedLevels, getNeedLevels, isNeedLevelsInitialized };
