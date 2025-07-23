import { Link, useNavigate } from "react-router";
import LetterCard from "../components/LetterCard";
import Logo from "../components/Logo";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function MyLetters() {
  const [letters, setLetters] = useState([]);
  const [repliesNumber, setRepliesNumber] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.get(API_URL+"/check-auth", {
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
    const fetchLetter = async () => {
      try {
        const { data } = await axios.get(API_URL + "/my-letters", {
          withCredentials: true,
        });
        setLetters(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchRepliesNumber = async () => {
      try {
        const { data } = await axios.get(API_URL + "/replies-number", {
          withCredentials: true,
        });
        setRepliesNumber(data);
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchLetter();
    fetchRepliesNumber();
  }, []);

  

  return (
    <div>
      <div className="">
        <Logo height={"md:h-50 h-40"} />
        <p className="text-center text-white md:text-2xl text-xl -mt-10">
          listen to anonymous music recommendations!
        </p>
      </div>
      <div className="bg-[#368b90]/30 md:border-10 border-8 border-[#368b90] py-5 md:w-200 w-[95%] mx-auto md:px-5 px-2 rounded-2xl mt-10 transition-all">
        <p className="w-fit ml-auto text-6xl text-white -mt-5 mr-0 hover:rotate-10  transition-all">
          <Link className="pointer" to={"/home"}>
            x
          </Link>
        </p>
        <img
          src="./imgs/drawings/scroll.png"
          className="md:size-20 size-18 mx-auto -mt-10"
        ></img>
        <p className="text-center md:text-4xl text-3xl text-white">my letters</p>
        <div>
          <div className="pt-5 pb-3 md:px-18 px-2 transition-all h-full w-full -mt-10">
            <p
              className={`text-4xl transition-all duration-1000 text-center  `}
            >
              &nbsp;
            </p>
            <div className="flex flex-col gap-2">
              {letters.map((letter) => (
                <div className=" flex gap-2 mx-auto w-fit" key={letter.id}>
                  <Link to={"/replies/"+letter.id}
                    className={`*:transition-all pointer letter2 flex gap-3 p-4 rounded-lg h-fit  transition-all pointer md:w-110 w-80 hover:scale-103 hover:rotate-1 items-center
                  `}
                  >
                    <img
                      src={letter.music_img}
                      className="md:h-16 h-14 rounded-xl"
                    ></img>
                    <div className="mt-auto">
                      <p className="md:text-2xl text-xl text-[#81724A]">
                        {/* {animation2 ? musicTitle : ""} */}
                        {letter.music_title}
                      </p>
                      <p className="md:text-xl text-lg -mt-1 text-white/80 -mb-1">
                        {/* {animation2 ? musicArtist : ""} */}
                        {letter.music_artist}
                      </p>
                    </div>
                  </Link>
                  <div className="letter3 text-center text-white px-3 flex flex-col rounded-lg *:transition-all">
                    <p className="md:text-5xl text-4xl mt-auto">{repliesNumber.find(item => item.letter_id === letter.id)?.reply_count || "..."}</p>
                    <p className="md:text-2xl text-xl text-[#81724A] mb-1 -mt-2">
                      replies
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLetters;
