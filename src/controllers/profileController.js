// // src/controllers/profileController.js
// const { appUser, address } = require("../models");
// const { getUserTypes, getUserTypeById } = require("../util/loadUserTypes");
// const { PARENT, LSA } = require("../../config/constants");

// const updateUserProfile = async (req, res) => {
//   try {
//     const { streetAddress, city, postalAddress, phoneNumber, type } = req.body;
//     const authUser = req.authUser; // This is set by the middleware
//     const userId = req.authUser.id;
//     if (!authUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     let ut = getUserTypeById(authUser.userType);
//     if (ut === PARENT) {
//       let typeVal = type;
//       if (!type) {
//         typeVal = "home";
//       }
//       console.log("typeVal: type: " + typeVal + " :" + type);
//       const addressModel = await address.create({
//         userId,
//         type: typeVal,
//         streetAddress,
//         city,
//         postalAddress,
//       });

//       await addressModel.save();
//       authUser.phoneNumber = phoneNumber;
//       await authUser.save();
//     }

//     if (ut == LSA) {
//     }

//     res.status(200).json({ message: "profile updated successfully", userId });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating the profile" });
//   }
// };

// const getAddresses = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const addresses = await address.findAll({ where: { userId } });
//     res.status(200).json(addresses);
//   } catch (error) {
//     console.error("Error fetching addresses:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the addresses" });
//   }
// };

// module.exports = {
//   updateUserProfile,
//   getAddresses,
// };

const {
  appUser,
  workExperienceSQLModel,
  profileSQLModel,
} = require("../models");

const getProfile = async (req, res) => {
  try {
    const authUser = req.authUser;
    if (!authUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = await appUser.findOne({
      where: { id: authUser.id },
      include: [{ model: workExperienceSQLModel, as: "workExperiences" }],
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.status(200).json(profile);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const authUser = req.authUser;
    const {
      firstName,
      lastName,
      nationality,
      highestEducation,
      dob,
      ethnicity,
      specialization,
      gender,
      phoneNumber,
    } = req.body;

    let profile = await appUser.findOne({
      where: { id: authUser.id },
    });

    if (profile) {
      profile.firstName = firstName || profile.firstName;
      profile.lastName = lastName || profile.lastName;
      profile.nationality = nationality || profile.nationality;
      profile.highestEducation = highestEducation || profile.highestEducation;
      profile.dob = dob || profile.dob;
      profile.ethnicity = ethnicity || profile.ethnicity;
      profile.specialization = specialization || profile.specialization;
      profile.gender = gender || profile.gender;
      profile.phoneNumber = phoneNumber || profile.phoneNumber;

      if (req.file) {
        profile.cv = req.file.buffer; // Update CV if a new file is uploaded
      }

      await profile.save();
    } else {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.status(200).json(profile);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the profile" });
  }
};

const addWorkExperience = async (req, res) => {
  try {
    const authUser = req.authUser;
    const { school, student, startDate, endDate, rating } = req.body;

    console.log("req.body =====> ", req.body);

    const workExperience = await workExperienceSQLModel.create({
      school,
      student,
      startDate,
      endDate,
      rating,
      appUserId: authUser.id,
    });

    return res.status(201).json(workExperience);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "An error occurred while adding work experience" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  addWorkExperience,
};
