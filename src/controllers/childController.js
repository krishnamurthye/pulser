// controllers/childController.js

const { appUser } = require("../models");

// Controller function to add a new child under an existing parent
exports.addChild = async (req, res) => {
  try {
    // Parse request body
    const { firstName, lastName, dob, school } = req.body;
    const authUserId = req.authUser.id;

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
      school,
      parentId: authUserId, // Associate the child with the parent by setting the parentId
      role: 2, // Assuming 'child' role has ID 2, adjust as per your role definitions
      userType: 2, // Assuming 'child' user type has ID 2, adjust as per your user type definitions
      isActive: true, // Assuming the child is active upon creation
    });

    res.status(201).json({ message: "Child added successfully", child });
    // Respond with the newly created child
  } catch (error) {
    console.error("Error adding child:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.getChildren = async (req, res) => {
//   try {
//     const authUserId = req.authUser.id;

//     // Validate input
//     if (!authUserId) {
//       return res.status(400).json({ error: "Parent Id is missing" });
//     }

//     // Find the parent in the database
//     const parent = await appUser.findByPk(authUserId);

//     // Check if parent exists
//     if (!parent) {
//       return res.status(404).json({ error: "Parent not found" });
//     }

//     // Create the child under the parent
//     const child = await appUser.create({
//       firstName,
//       lastName,
//       dob,
//       school,
//       parentId: authUserId, // Associate the child with the parent by setting the parentId
//       role: 2, // Assuming 'child' role has ID 2, adjust as per your role definitions
//       userType: 2, // Assuming 'child' user type has ID 2, adjust as per your user type definitions
//       isActive: true, // Assuming the child is active upon creation
//     });

//     res.status(201).json({ message: "Child added successfully", child });
//     // Respond with the newly created child
//   } catch (error) {
//     console.error("Error adding child:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
