import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "./Logo";
import { Link } from "react-router";
import LetterCard from "./LetterCard";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Letter({
  message,
  setMessage,
  musicTitle,
  setMusicTitle,
  musicArtist,
  setMusicArtist,
  musicImg,
  setMusicImg,
}) {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [songSelected, setSongSelected] = useState("");

  axios.defaults.withCredentials = true;

  async function searchSong(query) {
    try {
      const res = await axios.get(API_URL + `/spotify-search`, {
        params: { q: query, type: "track" },
      });
      console.log(res.data);
      setTracks(res.data.tracks.items);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  function handleSongSelect(track) {
    setSongSelected(track);
    setMusicTitle(track.name)
    setMusicArtist(track.artists.map((a) => a.name).join(", "))
    setMusicImg(track.album.images[0]?.url)

    setQuery("");
  }

  useEffect(() => {
    query !== "" ? searchSong(query) : setTracks([]);
  }, [query]);
  return (
    <form>
      <LetterCard>
        <div className="pt-5 pb-3 px-18 h-full w-full -mt-10">
          <p className="text-4xl">message:</p>
          <textarea className="text bg-[#BBAC7A]/40 rounded-xl w-full text-3xl py-3 px-5 mt-3 hover:bg-[#BBAC7A]/50 transition-all active:scale-102 focus:ring-3 focus:ring-[#BBAC7A] focus:outline-0 focus:bg-[#BBAC7A]/50" onChange={(e)=>setMessage(e.target.value)} value={message}></textarea>
          <div className="mt-5 flex gap-10">
            <div className="">
              <p className="text-3xl">search a song:</p>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="bg-[#BBAC7A]/40 rounded-xl w-full text-2xl py-1 px-3 hover:bg-[#BBAC7A]/50 transition-all active:scale-102 focus:ring-3 focus:ring-[#BBAC7A] focus:outline-0 focus:bg-[#BBAC7A]/50"
              />
              <div className="flex flex-col gap-1 mt-2">
                {tracks.map((track) => (
                  <li
                    key={track.id}
                    className="flex items-center space-x-4 bg-white/40 p-2 rounded-xl pointer hover:scale-102 transition-all hover:bg-white/60"
                    onClick={() => handleSongSelect(track)}
                  >
                    <img
                      src={track.album.images[0]?.url}
                      alt={track.name}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <div>
                      <div className="font-bold">{track.name}</div>
                      <div className="text-sm text-[#82734B]/70">
                        {track.artists.map((a) => a.name).join(", ")}
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </div>
            <div className="flex gap-3 bg-white/40 p-3 rounded-lg h-fit">
              <img
                src={
                  songSelected !== ""
                    ? musicImg
                    : "./imgs/song/cover_default.png"
                }
                className="h-16 rounded-xl"
              ></img>
              <div className="mt-auto">
                <p className="text-2xl">
                  {songSelected !== "" ? musicTitle : "no song selected"}
                </p>
                <p className="text-xl -mt-1 text-[#82734B]/70 -mb-1">
                  {songSelected !== ""
                    ? musicArtist
                    : ":("}
                </p>
              </div>
            </div>
          </div>
        </div>
      </LetterCard>
    </form>
  );
}

export default Letter;
