// src/controllers/profileController.js

const { loadSchoolsList, loadSchoolsSystem, getSchoolLists, getSchoolSystemLists, isSchoolsListInitialized, isSchoolSystemListInitialized } = require('../loaders/loadData');

const getSchoolList = async (req, res) => {
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


const getSchoolSystemList = async (req, res) => {
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


module.exports = {
  getSchoolList, getSchoolSystemList
};
