const request = require("supertest");
const { app } = require("../src/app");
const { sequelize, lsaRequest } = require("../src/models");
const { appUser } = require("../src/models");
const { generateToken } = require('../src/middleware/tokenGenerator');

describe("LSA Request API", () => {
  let token;

  beforeAll(async () => {
    // Create tables and get JWT token
    await sequelize.sync({ force: true });
    // Assuming you have a function to generate token
    const u = await appUser.create({
      id: 1,
      email: "test@example.com",
      password: "password123",
      userType: 1,
    });
    token = await generateToken(u);

    await appUser.create({
      firstName: "Child",
      lastName: "User2",
      role: 2,
      userType: 2,
      parentId: 1,
      dob: "2005-01-01",
      isActive: true,
    });
  });

  test("should create a new LSA request", async () => {
    const lsaRequestData = {
      child: 2,
      age: 10,
      grade: 5,
      school: 1,
      needs: 1,
      start_date: new Date(),
      end_date: new Date(),
      lsaType: 1,
      experience: 2,
      comments: "Test comment",
    };

    const response = await request(app)
      .post("/api/lsaRequest/create")
      .set("Authorization", `Bearer ${token}`)
      .send(lsaRequestData);

    console.log("response", response);
    console.log("response.status", response.status);
    console.log(
      "response.body.child, lsaRequestData.child",
      response.body.child,
      lsaRequestData.child
    );

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.child).toBe(lsaRequestData.child);
  });
});

describe("LSA Request API", () => {
  let token;
  let parentUser, childUser1, childUser2;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    parentUser = await appUser.create({
      firstName: "Parent",
      lastName: "User",
      email: "parent@example.com",
      role: 1,
      isActive: true,
      userType: 1,
    });
    childUser1 = await appUser.create({
      firstName: "Child1",
      lastName: "User1",
      email: "child1@example.com",
      parentId: parentUser.id,
      role: 2,
      isActive: true,
      userType: 2,
    });

    childUser2 = await appUser.create({
      firstName: "Child2",
      lastName: "User2",
      email: "child2@example.com",
      parentId: parentUser.id,
      role: 2,
      isActive: true,
      userType: 2,
    });

    await lsaRequest.create({
      child: childUser1.id,
      age: 10,
      grade: 5,
      school: 1,
      needs: 1,
      start_date: "2024-09-01",
      end_date: "2025-06-30",
      lsaType: 1,
      experience: 2,
      comments: "Requires additional support for Child1",
    });

    await lsaRequest.create({
      child: childUser2.id,
      age: 5,
      grade: 5,
      school: 1,
      needs: 1,
      start_date: "2024-10-10",
      end_date: "2025-05-10",
      lsaType: 1,
      experience: 2,
      comments: "Requires additional support for Child2",
    });

    token = await generateToken(parentUser);
  });

  it("should create an LSA request", async () => {
    const lsaRequestData = {
      child: childUser1.id,
      age: 10,
      grade: 5,
      school: 1,
      needs: 1,
      start_date: "2024-09-01",
      end_date: "2025-05-30",
      lsaType: 1,
      experience: 2,
      comments: "Requires additional support",
    };

    const response = await request(app)
      .post("/api/lsaRequest/create")
      .set("Authorization", `Bearer ${token}`)
      .send(lsaRequestData);

    expect(response.status).toBe(201);
    expect(response.body.child).toBe(lsaRequestData.child);
    expect(response.body.comments).toBe(lsaRequestData.comments);
  });

  it("should get LSA requests for the parent", async () => {
    const response = await request(app)
      .get("/api/lsaRequest/list")
      .set("Authorization", `Bearer ${token}`);

    console.log("response.body ************* " );
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].child).toBe(childUser1.id);
  });

  it('should return a list of children with lsa requests for a given userId', async () => {
    
  
    const response = await request(app)
      .get('/api/parent/list/child')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    console.log("response.body ************* " );
    console.log(response.body)
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('id', 2);
    expect(response.body[0]).toHaveProperty('firstName', 'Child1');
    expect(response.body[0]).toHaveProperty('lastName', 'User1');

    expect(response.body[1]).toHaveProperty('id', 3);
    expect(response.body[1]).toHaveProperty('firstName', 'Child2');
    expect(response.body[1]).toHaveProperty('lastName', 'User2');
  });




});
