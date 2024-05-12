const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gradeList = require("./config/grades-list.json");
const needLevelList = require("./config/need-levels-list.json");
const schoolsList = require("./config/schools-list.json");

const {
  LOGIN_SELECT_ALL_USERS,
  REGISTRATION_ADD_USER,
  PARENT_ADD_CHILD,
  PARENT_GET_ALL_CHILDREN,
} = require("./sql/queries");
const saltRounds = 10;

const secretKey = process.env.JWT_SECRET || "your_secret_key";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4201;

// Database connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const corsOptions = {
  origin: "*", // Replace with the URL of your front-end app
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { username, email, password, phoneNumber, role } = req.body;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }
    pool.execute(
      REGISTRATION_ADD_USER,
      [username, email, hash, phoneNumber, role],
      (error, results) => {
        if (error) {
          console.error("Failed to insert user: ", error.Error);
          return res
            .status(500)
            .json({ error: "Internal server error", message: error.Error });
        }
        res.status(201).json({
          message: "User registered successfully",
          userId: results.insertId,
        });
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  pool.execute(LOGIN_SELECT_ALL_USERS, [username], (error, results) => {
    if (error) {
      console.error("Failed to retrieve user: ", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length > 0) {
      const user = results[0];
      // Verify password (assuming plaintext for simplicity, but consider using bcrypt)
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err)
          return res.status(500).json({ error: "Password validation error" });

        if (isMatch) {
          // Generate JWT
          const token = jwt.sign(
            {
              userId: user.id,
              username: user.username,
              role: user.role,
            },
            secretKey,
            { expiresIn: "1h" } // Token expiry, e.g., 1 hour
          );

          // Respond with user data and token
          res.status(200).json({
            message: "Login successful",
            user: { id: user.id, username: user.username, role: user.role },
            token: token,
          });
        } else {
          res.status(401).json({ message: "Login failed, incorrect password" });
        }
      });
    } else {
      res.status(401).json({ message: "Login failed, user not found" });
    }
  });
});

// POST endpoint to add a child
app.post("/api/children/add", (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    school,
    grade,
    needLevel,
    age,
    additionalInfo,
    isActive,
    username,
  } = req.body;

  function sanitizeInput(value) {
    return value === undefined ? null : value;
  }

  pool.execute(
    PARENT_ADD_CHILD,
    [
      sanitizeInput(firstName),
      sanitizeInput(lastName),
      sanitizeInput(dob),
      sanitizeInput(age),
      sanitizeInput(school),
      sanitizeInput(grade),
      sanitizeInput(needLevel),
      sanitizeInput(additionalInfo),
      sanitizeInput(username),
      sanitizeInput(isActive),
    ],
    (error, results) => {
      if (error) {
        console.error("Failed to insert into children:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({
        message: "Child added successfully",
        childId: results.insertId,
      });
    }
  );
});

app.get("/api/children/:username", (req, res) => {
  const { username } = req.params; // Extract username from path parameters
  // Assuming JWT middleware sets `req.user`

  const query = "SELECT * FROM children WHERE username = ?";
  const params = [username];

  pool.query(query, params, (error, results) => {
    if (error) {
      console.error("Failed to retrieve children:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
});

app.get("/api/children/uiparams/:username", (req, res) => {
  const { username } = req.params; // Extract username from path parameters
  // Assuming JWT middleware sets `req.user`

  res.status(200).json({ gradeList, needLevelList, schoolsList });
});

// Middleware to authenticate and set req.user
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as "Bearer <token>"
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Failed to authenticate token." });
      }
      req.user = decoded; // Add the decoded token to the request so it can be used in subsequent handlers
      next();
    });
  } else {
    res.status(401).json({ error: "No token provided." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
