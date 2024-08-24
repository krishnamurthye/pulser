//const { lsaRequest } = require('../models');
const { appUser, lsaRequest } = require('../models');

const createLsaRequest = async (req, res) => {
  try {
    const { child, age, grade, school, needs, start_date, end_date, lsaType, experience, comments } = req.body;

    const authUserId = req.authUser.id;

    // Validate input
   // TODO

    // Find the parent in the database
    const parent = await appUser.findByPk(authUserId);
    const childModel = await appUser.findByPk(child);

    console.log("parent: child:, childModel.parent", parent.id, child, childModel.parentId);


    // Check if parent exists
    if (!parent || !childModel || childModel.parentId != authUserId) {
      return res.status(404).json({ error: "Invalid input" });
    }

    // Create the LSA Request
    const newLsaRequest = await lsaRequest.create({
      child,
      age,
      grade,
      school,
      needs,
      start_date,
      end_date,
      lsaType,
      experience,
      comments
    });
    //console.log("newLsaRequest", newLsaRequest);
    res.status(201).json(newLsaRequest);
  } catch (error) {
    console.error('Error creating LSA request:', error);
    res.status(500).json({ error: 'An error occurred while creating LSA request' });
  }
};

const getLsaRequestsByParent = async (req, res) => {
    try {
        const parentId = req.authUser.id;

        const children = await appUser.findAll({ where: { parentId } });

        const childIds = children.map(child => child.id);

        const lsaRequests = await lsaRequest.findAll({
            where: { child: childIds },
            include: [{ model: appUser, as: 'childDetails' }]
        });
        console.log(lsaRequest);
        res.status(200).json(lsaRequests);
    } catch (error) {
        console.error('Error fetching LSA requests:', error);
        res.status(500).json({ error: 'An error occurred while fetching LSA requests' });
    }
};

module.exports = {
  createLsaRequest,
  getLsaRequestsByParent
};
