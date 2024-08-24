const fs = require('fs');
const path = require('path');
const { education } = require('../models');

let educationList = [];
let isLoaded = false;

async function loadEducation() {
    try {
        const filePath = path.join(__dirname, '../../config/education.json');
        const educationList = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        for (const item of educationList) {
            await education.findOrCreate({
                where: { id: item.id },
                defaults: {
                    education: item.education,
                    isActive: item.isActive
                }
            });
        }
        isLoaded = true;
        console.log('Education data loaded successfully.');
    } catch (error) {
        console.error('Error loading education data:', error);
    }
}

function getEducationList() {
    return educationList;
}

function isEducationListInitialized() {
    return isLoaded;
}

module.exports = { loadEducation, getEducationList, isEducationListInitialized };
