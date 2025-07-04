
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
      // res.json(newUser.rows[0]);
    } else {
      console.log("Email or password is empty");
    }
  } catch (err) {
    console.log(err.message);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await pool.query("SELECT * FROM users WHERE email=$1", [
        email,
      ]);

      // res.json(user.rows[0]);
      bcrypt.compare(password, user.rows[0].password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return;
        }

        if (result) {
          // res.json({ authenticated: true });
          const token = createToken(user.rows[0].id);

          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000,
          });

          res.json({ message: "Login successful", auth: true });
        } else {
          res.json({ authenticated: false });
        }
      });
    } else {
      console.log("Email or password is empty");
    }
  } catch (err) {
    console.log(err.message);
  }
}
