import express from "express";
import cors from "cors";
import axios from "axios";
import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

let cachedToken = null;
let tokenExpiry = null;


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
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/spotify-search", async (req, res) => {
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

app.listen(5000, () => {
  console.log("server on port 5000");
});
