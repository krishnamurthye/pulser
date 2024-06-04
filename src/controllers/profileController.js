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
