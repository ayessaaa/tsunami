import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import Logo from "../components/Logo";
import WaveButton from "../components/WaveButton";
import LetterCard from "../components/LetterCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function OpenLetter() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [musicArtist, setMusicArtist] = useState("");
  const [musicTitle, setMusicTitle] = useState("");
  const [musicImg, setMusicImg] = useState("");

  const [animation1, setAnimation1] = useState(false);
  const [animationText1, setAnimationText1] = useState(false);
  const [animation2, setAnimation2] = useState(false);
  const [animation3, setAnimation3] = useState(false);

  async function handleOpenLetter() {
    setIsOpen(true);
    try {
      const { data } = await axios.get(API_URL + "/get-letter", {
        withCredentials: true,
      });
      setMusicArtist(data.music_artist);
      setMusicImg(data.music_img);
      setMusicTitle(data.music_title);
      setMessage(data.message);
    } catch (err) {
      console.log(err);
    }
  }

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

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setAnimation1(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen]);

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

  useEffect(() => {
    if (!animation2) return;
    const timer = setTimeout(() => {
      setAnimation3(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [animation2]);

  return (
    <div>
      <div className="">
        <Logo height={"h-50"} />
        <p className="text-center text-white text-2xl -mt-10">
          listen to anonymous music recommendations!
        </p>
      </div>
      {!isOpen ? (
        <div>
          <p className="text-white text-center text-4xl mt-15 animate__animated animate__fadeIn ">
            woah a letter 4 u!
          </p>
          <img
            className="mt-10 h-80 mx-auto animate__animated animate__pulse animate__infinite animate__slow"
            src="./imgs/drawings/bottle2.png"
          ></img>

          <WaveButton
            text1={"open letter!"}
            className={
              "animate__animated animate__fadeIn animate__delay-2s mt-10"
            }
            onClick={handleOpenLetter}
          />
        </div>
      ) : (
        <div>
          <p className="text-white text-center text-4xl mt-15 animate__animated animate__fadeIn ">
            woah a letter 4 u!
          </p>
          <LetterCard
            className={`mt-5 animate__animated animate__fadeIn letter transition-all duration-1000 ease-in-out overflow-hidden p-8 ${
              animation1 ? "w-[50%] " : "w-40 "
            } `}
            x={false}
          >
            <div className="pt-5 pb-3 px-18 h-full w-full -mt-10">
              <p
                className={`text-4xl transition-all duration-1000 text-center  ${
                  animationText1 ? "opacity-100 mt-5 " : "opacity-0  -mt-5"
                }`}
              >
                {animationText1 && message}&nbsp;
              </p>
              <div className="mt-5 flex gap-10">
                <div
                  className={`flex gap-3 bg-white/40 p-3 rounded-lg h-fit mx-auto transition-all duration-1000 ${
                    animation2 ? "opacity-100 mt-0" : "opacity-0 -mt-20"
                  } `}
                >
                  <img src={musicImg} className="h-16 rounded-xl"></img>
                  <div className="mt-auto">
                    <p className="text-2xl">{animation2 ? musicTitle : ""}</p>
                    <p className="text-xl -mt-1 text-[#82734B]/70 -mb-1">
                      {animation2 ? musicArtist : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </LetterCard>

          <WaveButton
            className={`${
              animation3 ? "opacity-100" : "opacity-0 "
            } duration-700 transition-all`}
            text1={"reply!"}
            text2={"share ur thoughts n reco also"}
          ></WaveButton>
        </div>
      )}
    </div>
  );
}

export default OpenLetter;
