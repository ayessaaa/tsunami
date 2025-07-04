import axios from "axios";

let cachedToken = null;
let tokenExpiry = null;

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

export async function spotifySearch(req, res) {
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
}
