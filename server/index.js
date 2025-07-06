import express from "express";
import cors from "cors";
import axios from "axios";
import pool from "./db.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middlewares/AuthMiddleware.js";
import { login, signup } from "./controllers/AuthController.js";
import { spotifySearch } from "./controllers/SpotifyController.js";

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

app.get("/check-auth", verifyToken, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});

app.get("/spotify-search", verifyToken, spotifySearch);

// db postgres routes

// add a letter
app.post("/add-letter", verifyToken, async (req, res) => {
  try {
    const from_user_id = req.userId;
    const { message, music_title, music_artist, music_img } = req.body;

    const newLetter = await pool.query(
      "INSERT INTO letters (from_user_id, message, music_title, music_artist, music_img) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [from_user_id, message, music_title, music_artist, music_img]
    );

    res.json(newLetter.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// get random letter
// - not from user
// - not been replied by user
app.get("/get-letter", verifyToken, async (req, res) => {
  try {
    const allLetters = await pool.query(
      "SELECT * FROM letters WHERE from_user_id != $1 AND id NOT IN (SELECT letter_id FROM replies WHERE from_user_id = $1);",
      [req.userId]
    );
    const randomLetter = allLetters.rows[Math.floor(Math.random() * allLetters.rows.length)];
    res.json(randomLetter);
  } catch (err) {
    console.log(err.message);
  }
});

// update

// delete

// select all

// select

// add user - sign up
app.post("/signup", signup);

// log in
app.post("/login", login);

app.listen(process.env.PORT, () => {
  console.log("server on port 5000");
});
