// src/controllers/profileController.js
const { appUser, address } = require('../models');
const { getUserTypes, getUserTypeById } = require('../util/loadUserTypes');
const { PARENT, LSA } = require('../../config/constants');

const updateUserProfile = async (req, res) => {
  try {
    const { streetAddress, city, postalAddress, phoneNumber, type } = req.body;
    const authUser = req.authUser;  // This is set by the middleware
    const userId = req.authUser.id;
    if (!authUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    let ut = getUserTypeById(authUser.userType);
    if (ut === PARENT) {
      let typeVal = type;
      if (!type) {
        typeVal = 'home';
      }
      console.log("typeVal: type: " + typeVal + " :" + type)
      const addressModel = await address.create({
        userId,
        type: typeVal,
        streetAddress,
        city,
        postalAddress,
      });

      await addressModel.save();
      authUser.phoneNumber = phoneNumber;
      await authUser.save();
    }

    if (ut == LSA){


      
    }

    res.status(200).json({ message: 'Profile updated successfully', userId });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'An error occurred while updating the profile' });
  }
};

const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await address.findAll({ where: { userId } });
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: 'An error occurred while fetching the addresses' });
  }
};

module.exports = {
  updateUserProfile,
  getAddresses
};
