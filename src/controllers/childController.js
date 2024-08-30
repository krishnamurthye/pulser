// controllers/childController.js

const { appUser,lsaRequest,schooling, schoolsList,needLevel, grades } = require("../models");
//const {getSchoolLists, getSchoolSystemLists} = require('../loaders/loadSchools');



// Controller function to add a new child under an existing parent
exports.addChild = async (req, res) => {
  try {
    // Parse request body
    const { firstName, lastName, dob, school, schoolSystem, grade, status, needLevel, additionalInfo, age, isActive } = req.body;
    const authUserId = req.authUser.id;

    const schoolId = school;
    const additionalDetails = additionalInfo;

    // Validate input
    if (!firstName || !lastName || !dob || !school || !authUserId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the parent in the database
    const parent = await appUser.findByPk(authUserId);

    // Check if parent exists
    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }


    // Create the child under the parent
    const child = await appUser.create({
      firstName,
      lastName,
      dob,
      parentId: authUserId, // Associate the child with the parent by setting the parentId
      role: 2, // Assuming 'child' role has ID 2, adjust as per your role definitions
      userType: 2, // Assuming 'child' user type has ID 2, adjust as per your user type definitions
      isActive: isActive, // Assuming the child is active upon creation
    });



    // Add schooling information for the child
    if (schoolId || grade || status || needLevel || additionalDetails) {
      await schooling.create({
        userId: child.id,
        grade,
        schoolId,
        status,
        needLevel,
        additionalDetails
      });
    }

    res.status(201).json({ message: "Child added successfully", child });
    // Respond with the newly created child
  } catch (error) {
    console.error("Error adding child:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.listChild = async (req, res) => {
  try {
    // Parse request body
    const authUserId = req.authUser.id;

    // Find the parent in the database
    const parent = await appUser.findByPk(authUserId);

    // Check if parent exists
    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }

    // Fetch children with schooling data
    const children = await appUser.findAll({
      where: {
        parentId: parent.id,
        userType: 2, // Assuming userType 2 is for children
      },
      attributes: ["id", "firstName", "lastName", "dob", "email", "gender","isActive"],
      include: [
        {
          model: lsaRequest,
          as: 'lsaRequests',
          attributes: ["id", "age", "grade", "school", "needs", "start_date", "end_date", "lsaType", "experience", "comments"],
        },
        {
          model: schooling,
          as: 'schooling',
          attributes: ["id", "schoolSystem", "grade", "schoolId", "status", "needLevel", "additionalDetails"],
        }
      ]
    });

    // Map over children to include required fields from schooling
    const childrenWithSchooling = await Promise.all(children.map(async (child) => {
      // Fetch schooling data for the current child
      const schoolingData = await Promise.all(child.schooling.map(async (school) => {
        const schoolIdData = await schoolsList.findByPk(school.schoolId);
        const needLevelData = await needLevel.findByPk(school.needLevel);
        const gradeData = await grades.findByPk(school.grade);

        return {
          schoolId: schoolIdData ? { id: schoolIdData.id, name: schoolIdData.name } : null,
          needLevel: needLevelData ? { id: needLevelData.id, name: needLevelData.name } : null,
          grade: gradeData ? { id: gradeData.id, name: gradeData.name } : null
        };
      }));

      return {
        ...child.toJSON(),
        schooling: schoolingData
      };
    }));

    res.status(200).json(childrenWithSchooling);
  } catch (error) {
    console.error("Error listing child:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Controller function to get existing children for a parent
exports.getChild = async (req, res) => {
  try {
    // Parse request body
    const authUserId = req.authUser.id;
    const childId = req.params.childId;

    // Find the parent in the database
    const parent = await appUser.findByPk(authUserId);

    //TODO check userType should be parent

    // Check if parent exists
    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }

    // get children under the parent
    const children = await appUser.findAll({
      where: {
        parentId: parent.id,
        userType: 2, // Assuming userType 2 is for children
        id:childId
      },
      attributes: ["id", "firstName", "lastName", "dob", "email", "gender"],
    });

    res.status(200).json(children);
    // Respond with the newly created child
  } catch (error) {
    console.error("Error adding child:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
