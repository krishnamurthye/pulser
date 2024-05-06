const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  LOGIN_SELECT_ALL_USERS,
  REGISTRATION_ADD_USER,
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
  origin: "http://localhost:3001", // Replace with the URL of your front-end app
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { username, email, password, phoneNumber, role } = req.body;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    const query =
      "INSERT INTO users (username, email, password, phoneNumber, role) VALUES (?, ?, ?, ?, ?)";

    console.log("registration sql query =====> ", REGISTRATION_ADD_USER);
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }
    pool.execute(
      REGISTRATION_ADD_USER,
      [username, email, hash, phoneNumber, role],
      (error, results) => {
        if (error) {
          console.error("Failed to insert user: ", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({
          message: "User registered successfully",
          userId: results.insertId,
        });
      }
    );
  });
});

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   const query = "SELECT * FROM users WHERE username = ?";

//   pool.execute(query, [username], (error, results) => {
//     if (error) {
//       console.error("Failed to retrieve user: ", error);
//       return res.status(500).json({ error: "Internal server error" });
//     }
//     if (results.length > 0) {
//       bcrypt.compare(password, results[0].password, function (err, result) {
//         if (result) {
//           // Passwords match
//           res.status(200).json({ message: "Login successful" });
//         } else {
//           // Passwords do not match
//           res.status(401).json({ message: "Login failed, incorrect password" });
//         }
//       });
//     } else {
//       // User not found
//       res.status(401).json({ message: "Login failed, user not found" });
//     }
//   });
// });

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
