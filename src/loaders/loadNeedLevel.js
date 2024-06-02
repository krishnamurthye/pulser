const fs = require("fs");
const path = require("path");
const { needLevelList } = require("../models");

let needLevelList;
let isLoaded = false;

// async function loadNeedLevel() {
//     try {
//         const filePath = path.join(__dirname, '../../config/need-level-list.json');
//         specializationList = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

//         for (const item of needLevelList) {
//             await specialization.findOrCreate({
//                 where: { id: item.id },
//                 defaults: {
//                     specialization: item.specialization,
//                     isActive: item.isActive
//                 }
//             });
//         }
//         isLoaded = true;
//         console.log('Specialization data loaded successfully.');
//     } catch (error) {
//         console.error('Error loading specialization data:', error);
//     }
// }

function getSpecializations() {
  return specializationList;
}

function isInitialized() {
  return isLoaded;
}

module.exports = { loadSpecialization, getSpecializations, isInitialized };
