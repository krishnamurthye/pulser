const fs = require('fs');
const path = require('path');
const { specialization } = require('../models');


let specializationList;
let isLoaded = false;

async function loadSpecialization() {
    try {

        if (isLoaded) {
            console.log('Specialization data is already loaded.');
            return;
        }

        const filePath = path.join(__dirname, '../../config/specialization.json');
        specializationList = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        for (const item of specializationList) {
            await specialization.findOrCreate({
                where: { id: item.id },
                defaults: {
                    specialization: item.specialization,
                    isActive: item.isActive
                }
            });
        }
        isLoaded = true;
        console.log('Specialization data loaded successfully.');
    } catch (error) {
        console.error('Error loading specialization data:', error);
    }
}

function getSpecializations() {
    loadSpecialization();
    return specializationList;
}

function isInitialized() {
    return isLoaded;
}

module.exports = { loadSpecialization, getSpecializations, isInitialized };
