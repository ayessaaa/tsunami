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
  songSelected,
  setSongSelected,
}) {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);

  const [animation1, setAnimation1] = useState(false);
  const [animationText1, setAnimationText1] = useState(false);
  const [animation2, setAnimation2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation1(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!animation1) return;
    const timer = setTimeout(() => {
      setAnimationText1(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [animation1]);

  useEffect(() => {
    if (!animationText1) return;
    const timer = setTimeout(() => {
      setAnimation2(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [animationText1]);

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
    setMusicTitle(track.name);
    setMusicArtist(track.artists.map((a) => a.name).join(", "));
    setMusicImg(track.album.images[0]?.url);

    setQuery("");
  }

  useEffect(() => {
    query !== "" ? searchSong(query) : setTracks([]);
  }, [query]);
  return (
    <form>
      <LetterCard
        className={`mt-5 animate__animated animate__fadeIn letter transition-all duration-1000 ease-in-out overflow-hidden  ${
          animation1 ? "md:w-[50%] w-[95%] " : "w-40 "
        } `}
        x={true}
      >
        <div className="pt-5 pb-3 md:px-18 px-10 h-full w-full -mt-10">
          <div
            className={`transition-all duration-1000 ${
              animationText1 ? "opacity-100 mt-0 " : "opacity-0  -mt-30"
            }`}
          >
            <p
              className={`md:text-4xl text-3xl transition-all duration-1000 text-center  `}
            >
              message:
            </p>
            <textarea
              className={` mb-3 text bg-[#BBAC7A]/40 rounded-xl w-full input-transition md:text-3xl text-2xl md:py-3 py-2 md:px-5 px-3 mt-3 hover:bg-[#BBAC7A]/50  active:scale-102 focus:ring-3 focus:ring-[#BBAC7A] focus:outline-0 focus:bg-[#BBAC7A]/50`}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
          </div>
          {!songSelected ? (
            <div
              className={` ${
                animation2 ? "opacity-100 mt-0 " : "opacity-0  -mt-15"
              } transition-all duration-1000`}
            >
              <p className="md:text-3xl text-2xl text-center">
                {animation2 && "search a song:"}&nbsp;
              </p>
              <div className="w-fit mx-auto">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  className="bg-[#BBAC7A]/40 rounded-xl w-fit text-2xl py-1 px-3 hover:bg-[#BBAC7A]/50 transition-all active:scale-102 focus:ring-3 focus:ring-[#BBAC7A] focus:outline-0 focus:bg-[#BBAC7A]/50"
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                {tracks.map((track) => (
                  <li
                    key={track.id}
                    className="w-100 md:text-lg text-base mx-auto flex items-center space-x-4 bg-white/40 p-2 rounded-xl pointer hover:scale-102 transition-all hover:bg-white/60"
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
                      <div className="font-bold md:text-lg text-base">{track.name}</div>
                      <div className="md:text-lg text-base text-[#82734B]/70">
                        {track.artists.map((a) => a.name).join(", ")}
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="md:text-3xl text-2xl transition-all duration-1000 text-center">
                recommended music:
              </p>
              <div className="flex gap-2  mx-auto w-fit mt-2">
                <div className="flex gap-3 bg-white/40 p-3 rounded-lg h-fit w-fit mx-auto">
                  <img
                    src={
                      songSelected !== ""
                        ? musicImg
                        : "./imgs/song/cover_default.png"
                    }
                    className="md:h-16 h-14 rounded-xl"
                  ></img>
                  <div className="mt-auto">
                    <p className="md:text-2xl text-xl">
                      {songSelected !== "" ? musicTitle : "no song selected"}
                    </p>
                    <p className="md:text-xl text-lg -mt-1 text-[#82734B]/70 -mb-1">
                      {songSelected !== "" ? musicArtist : ":("}
                    </p>
                  </div>
                </div>
                <p
                  className="w-fit text-5xl text-white  hover:text-6xl  transition-all text-center mx-auto -mt-1 pointer"
                  onClick={() => setSongSelected(false)}
                >
                  x
                </p>
              </div>
            </div>
          )}
        </div>
      </LetterCard>
    </form>
  );
}

export default Letter;
