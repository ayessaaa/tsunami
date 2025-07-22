import { useNavigate, useParams } from "react-router";
import axios from "axios";
import LetterCard from "../components/LetterCard";
import { useEffect, useState } from "react";
import Logo from "../components/Logo";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Replies() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [letter, setLetter] = useState([]);
  const [animation1, setAnimation1] = useState(false);
  const [animationText1, setAnimationText1] = useState(false);
  const [animation2, setAnimation2] = useState(false);
  const [animation3, setAnimation3] = useState(false);
  const [animation4, setAnimation4] = useState(false);

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
    async function fetchLetter() {
      try {
        const { data } = await axios.get(API_URL + "/letter/" + id, {
          withCredentials: true,
        });
        console.log(data);
        setLetter(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchLetter();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation1(true);
    }, 1000);

    return () => clearTimeout(timer);
  },);

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

  useEffect(() => {
    if (!animation3) return;
    const timer = setTimeout(() => {
      setAnimation4(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [animation3]);

  return (
    <div>
      <div className="">
        <Logo height={"h-40"} />
        <p className="text-center text-white text-xl -mt-10">
          listen to anonymous music recommendations!
        </p>
      </div>
      <p className="text-4xl text-white text-center mb-5 mt-5">my letter</p>
      <LetterCard className={`${animation1 ? "w-[50%] " : "w-40 "} transition-all duration-1000 ease-in-out`}>
        <div className="pt-5 pb-3 px-18 h-full w-full -mt-10">
          <p className={`text-4xl transition-all duration-1000 text-center ${
                  animationText1 ? "opacity-100 mt-5 " : "opacity-0  -mt-5"
                } `}>
            &nbsp;{animationText1 && letter[0]?.message || ""}
          </p>
          <div className="mt-5 flex gap-10">
            <div
              className={`flex gap-3 bg-white/40 p-3 rounded-lg h-fit mx-auto transition-all duration-1000 ${animation2 ? "opacity-100 mt-0" : "opacity-0 -mt-20"}`}
            >
              <img
                src={letter[0]?.music_img || ""}
                className="h-16 rounded-xl"
              ></img>
              <div className="mt-auto">
                <p className="text-2xl">{letter[0]?.music_title || ""}</p>
                <p className="text-xl -mt-1 text-[#82734B]/70 -mb-1">
                  {letter[0]?.music_artist || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </LetterCard>
      <div className={`mt-10  `}>
        <p className={`text-4xl text-white text-center duration-1000 transition-all mb-5 ${animation3 ? "opacity-100": "opacity-0"}`}>replies</p>
        {letter.length<1 ? letter.map((reply) => (
          <LetterCard x={false} className={`w-[40%] duration-1000 transition-all mb-5 ${animation4 ? "opacity-100": "opacity-0"}`}>
            <div className="pt-8 pb-1 px-18 h-full w-full -mt-10">
              <p
                className={`text-3xl transition-all duration-1000 text-center  `}
              >
                {reply.reply_message}
              </p>
              <div className="mt-2 flex gap-10">
                <div
                  className={`flex gap-3 bg-white/40 p-3 rounded-lg h-fit mx-auto transition-all duration-1000 `}
                >
                  <img
                    src={reply.reply_music_img || ""}
                    className="h-14 rounded-xl"
                  ></img>
                  <div className="mt-auto">
                    <p className="text-xl">{reply.reply_music_title || ""}</p>
                    <p className="text-lg -mt-1 text-[#82734B]/70 -mb-1">
                      {reply.reply_music_artist || ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </LetterCard>
        )) : <p className={`text-center text-2xl text-[#368b90] duration-1000 transition-all ${animation4 ? "opacity-100": "opacity-0"}`}>no replies yet :( ... </p>}
        {}
      </div>
    </div>
  );
}

export default Replies;
