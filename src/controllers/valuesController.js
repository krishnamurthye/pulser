// src/controllers/profileController.js

const { 
  loadSchoolsList, 
  loadSchoolsSystem, 
  getSchoolLists, 
  getSchoolSystemLists, 
  isSchoolsListInitialized, 
  isSchoolSystemListInitialized,
  getNeedLevels,
  getGrades
} = require('../loaders');

exports.getSchoolList = async (req, res) => {
  try {
    if (!isSchoolsListInitialized()) {
      await loadSchoolsList();
    }
    const schoolList = getSchoolLists();
    console.log(" *** schoolList ** ", schoolList);

    res.status(200).json(schoolList);
  } catch (error) {
    console.error('Error loading school list:', error);
    res.status(500).json({ error: 'An error occurred while loading school list' });
  }
};


exports.getSchoolSystemList = async (req, res) => {
  try {
    if (!isSchoolSystemListInitialized()) {
      await loadSchoolsSystem();
    }
    const schoolSystemLists = getSchoolSystemLists();
    console.log(" *** schoolSystemLists ** ", schoolSystemLists);

    res.status(200).json(schoolSystemLists);
  } catch (error) {
    console.error('Error loading school System list:', error);
    res.status(500).json({ error: 'An error occurred while loading school System List' });
  }
};

exports.getNeedLevelList = async (req, res) => {
  try {
    
    const needLevelLists = await getNeedLevels();
    console.log(" *** Need Level Lists ** ", needLevelLists);

    res.status(200).json(needLevelLists);
  } catch (error) {
    console.error('Error loading need Level  list:', error);
    res.status(500).json({ error: 'An error occurred while loading needLevel  List' });
  }
};


exports.getGardesList = async (req, res) => {
  try {
    
    const gradesLists = await getGrades();
    console.log(" *** Grades Lists ** ", gradesLists);

    res.status(200).json(gradesLists);
  } catch (error) {
    console.error('Error loading grades  list:', error);
    res.status(500).json({ error: 'An error occurred while loading grades  List' });
  }
};


// module.exports = {
//   getSchoolList, getSchoolSystemList, getNeedLevelList
// };
