import express from "express";
import cors from "cors";
import axios from "axios";
import pool from "./db.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middlewares/AuthMiddleware.js";

dotenv.config();

const app = express();

app.use(cookieParser()); 
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

let cachedToken = null;
let tokenExpiry = null;

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

// spotify api
const getSpotifyToken = async () => {
  const now = Date.now();

  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    return cachedToken;
  }

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET,
      },
    }
  );

  cachedToken = response.data.access_token;
  tokenExpiry = now + response.data.expires_in * 1000 - 60000;

  return cachedToken;
};

// ROUTES
// app.get("/", verifyToken, (req, res) => {
//   res.send("verified!");
// });

app.get("/check-auth", verifyToken, (req, res) => {
  res.status(200).json({ message: "Authenticated", userId: req.userId });
});

app.get("/spotify-search", verifyToken, async (req, res) => {
  const { q, type } = req.query;
  if (!q || !type) {
    return res.status(400).json({ error: "Missing query or type" });
  }
  try {
    const token = await getSpotifyToken();
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q,
        type,
        limit: 3,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error("Spotify search failed:", err.message);
    res.status(500).json({ error: "Spotify search error" });
  }
});

// db postgres routes

// create

// update

// delete

// select all

// select

// add user - sign up
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const hashedPassword = await hashPassword(req.body.password);

      const newUser = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, hashedPassword]
      );

      const userId = newUser.rows[0].id;
      
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

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
});

// log in
app.post("/login", async (req, res) => {
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

          res.json({ message: "Login successful", auth:true });
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
});

app.listen(process.env.PORT, () => {
  console.log("server on port 5000");
});
