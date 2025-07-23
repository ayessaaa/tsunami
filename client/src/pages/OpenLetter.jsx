import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import Logo from "../components/Logo";
import WaveButton from "../components/WaveButton";
import LetterCard from "../components/LetterCard";
import axios from "axios";
import Letter from "../components/Letter";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function OpenLetter() {
  const navigate = useNavigate();

  const [letterId, setLetterId] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [musicArtist, setMusicArtist] = useState("");
  const [musicTitle, setMusicTitle] = useState("");
  const [musicImg, setMusicImg] = useState("");

  const [songSelected, setSongSelected] = useState("");
  const [messageReply, setMessageReply] = useState("");
  const [musicArtistReply, setMusicArtistReply] = useState("");
  const [musicTitleReply, setMusicTitleReply] = useState("");
  const [musicImgReply, setMusicImgReply] = useState("");

  const [animation1, setAnimation1] = useState(false);
  const [animationText1, setAnimationText1] = useState(false);
  const [animation2, setAnimation2] = useState(false);
  const [animation3, setAnimation3] = useState(false);

  const [isReplyForm, setIsReplyForm] = useState(false);

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
      setLetterId(data.id);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleReplyLetter() {
    try {
      const res = await axios.post(
        API_URL + "/reply-letter",
        {
          letter_id: letterId,
          message: messageReply,
          music_title: musicTitleReply,
          music_artist: musicArtistReply,
          music_img: musicImgReply,
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
        <Logo height={"md:h-50 h-40"} />
        <p className="text-center text-white md:text-2xl text-xl transition-all -mt-10">
          listen to anonymous music recommendations!
        </p>
      </div>
      {!isOpen ? (
        <div>
          <p className="text-white text-center transition-all md:text-4xl text-3xl mt-15 animate__animated animate__fadeIn ">
            woah a letter 4 u!
          </p>
          <img
            className="mt-10 md:h-80 h-60 transition-all mx-auto animate__animated animate__pulse animate__infinite animate__slow"
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
          <p className="text-white text-center md:text-4xl text-3xl mt-15 animate__animated animate__fadeIn ">
            woah a letter 4 u!
          </p>
          <LetterCard
            className={`mt-5 animate__animated animate__fadeIn letter transition-all duration-1000 ease-in-out overflow-hidden md:p-8 p-2 ${
              animation1 ? "md:w-[50%] w-[95%] " : "w-40 "
            } `}
            x={false}
          >
            <div className="pt-5 pb-3 md:px-18 px-13 h-full w-full -mt-10">
              <p
                className={`md:text-4xl text-2xl transition-all duration-1000 text-center  ${
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
                  <img src={musicImg} className="md:h-16 h-14 rounded-xl"></img>
                  <div className="mt-auto">
                    <p className="md:text-2xl text-xl">{animation2 ? musicTitle : ""}</p>
                    <p className="md:text-xl text-lg -mt-1 text-[#82734B]/70 -mb-1">
                      {animation2 ? musicArtist : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </LetterCard>

          {isReplyForm && (
            <Letter
              message={messageReply}
              setMessage={setMessageReply}
              musicTitle={musicTitleReply}
              setMusicTitle={setMusicTitleReply}
              musicArtist={musicArtistReply}
              setMusicArtist={setMusicArtistReply}
              musicImg={musicImgReply}
              setMusicImg={setMusicImgReply}
              songSelected={songSelected}
              setSongSelected={setSongSelected}
            />
          )}

          {!isReplyForm ? (
            <WaveButton
              onClick={() => setIsReplyForm(true)}
              className={`${
                animation3 ? "opacity-100" : "opacity-0 "
              } duration-700 transition-all`}
              text1={"reply!"}
              text2={"share ur thoughts n reco also"}
            ></WaveButton>
          ) : messageReply !== "" && songSelected ? (
            <WaveButton
              onClick={handleReplyLetter}
              className={`animate__animated animate__fadeIn`}
              text1={"reply!"}
              text2={"toss that back to sender"}
            ></WaveButton>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default OpenLetter;
