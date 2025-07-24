
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// password encryption
const saltRounds = 10;
bcrypt.genSalt(saltRounds, (err, salt) => {
  if (err) {
    console.log(err);
    return;
  }
});
const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

// jwt create token
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export async function signup(req, res) {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (existingUser.rows.length > 0) {
        return res.status(409).json({ error: "Email is already taken." });
      }

      const hashedPassword = await hashPassword(req.body.password);

      const newUser = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, hashedPassword]
      );

      const userId = newUser.rows[0].id;

      const token = createToken(userId)

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000,
      });

      res.status(201).json({ message: "User created and logged in" });
    } else {
      console.log("Email or password is empty");
      res.status(400).json({ error: "Email or password is missing." });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error during signup." });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await pool.query("SELECT * FROM users WHERE email=$1", [
        email,
      ]);

      if (user.rows.length === 0) {
        return res.status(404).json({ error: "No account with that email." });
      }

      bcrypt.compare(password, user.rows[0].password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ error: "Server error." });
        }

        if (result) {
          const token = createToken(user.rows[0].id);

          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000,
          });

          res.json({ message: "Login successful", auth: true });
        } else {
          res.status(401).json({ error: "Incorrect password." });
        }
      });
    } else {
      console.log("Email or password is empty");
      res.status(400).json({ error: "Email or password is missing." });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error during login." });
  }
}