import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

import Letter from "../components/Letter";
import Logo from "../components/Logo";
import WaveButton from "../components/WaveButton";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function WriteLetter() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [musicTitle, setMusicTitle] = useState("");
  const [musicArtist, setMusicArtist] = useState("");
  const [musicImg, setMusicImg] = useState("");
  const [songSelected, setSongSelected] = useState("");

  const [buttonAnimation, setButtonAnimation] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.get(API_URL + "/check-auth", {
          withCredentials: true,
        });
        console.log("Authenticated");
      } catch (err) {
        console.log("Auth failed:", err.response?.data || err.message);
        navigate("/log-in");
      }
    };

    verifyCookie();
  }, [navigate]);

  async function handleAddLetter() {
    try {
      const res = await axios.post(
        API_URL + "/add-letter",
        {
          message,
          music_title: musicTitle,
          music_artist: musicArtist,
          music_img: musicImg,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      window.location = "/home";
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (!(message !== "" && songSelected)) return;
    const timer = setTimeout(() => {
      setButtonAnimation(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [message, songSelected]);
  return (
    <div>
      <Logo height="h-50" />
      <p className="text-center text-white text-2xl -mt-10">
        listen to anonymous music recommendations!
      </p>
      <div className="mt-15">
        <p className="text-center text-4xl text-white mb-5">
          write a letter and a music reco ofc :)
        </p>
        <Letter
          message={message}
          setMessage={setMessage}
          musicTitle={musicTitle}
          setMusicTitle={setMusicTitle}
          musicArtist={musicArtist}
          setMusicArtist={setMusicArtist}
          musicImg={musicImg}
          setMusicImg={setMusicImg}
          songSelected={songSelected}
          setSongSelected={setSongSelected}
        />
      </div>
      {message !== "" && songSelected ?<WaveButton
        onClick={handleAddLetter}
        text1="throw it to the sea"
        text2="ship! ship!"
        className={"animate__animated animate__fadeIn"}
      /> :""}
      
    </div>
  );
}

export default WriteLetter;
