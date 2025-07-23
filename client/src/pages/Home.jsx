import { Link, useNavigate } from "react-router"; 
import { useEffect } from "react";
import axios from "axios";

import Card from "../components/Card";
import Letter from "../components/Letter";
import Logo from "../components/Logo";
import MyLettersButton from "../components/MyLettersButton";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Home() {
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

  return (
    <>
      <div className="md:mt-20 transition-all">
        <Logo height={"md:h-50 h-40"} />
        <p className="text-center text-white md:text-2xl text-xl -mt-10">
          listen to anonymous music recommendations!
        </p>
      </div>
      <div className="flex md:flex-row flex-col w-fit mx-auto md:gap-15 gap-5 mt-15">
        <Link to={"/open-letter"}>
        <Card
          img="./imgs/drawings/bottle2.png"
          text="open a letter"
          imgsize="md:size-70 size-50"
        />
        </Link>
        <Link to={"/write-letter"}>
        <Card
          img="./imgs/drawings/letter2.png"
          text="write a letter"
          imgsize="md:size-70 size-50"
        />
        </Link>
      </div>

      <MyLettersButton/>
    </>
  );
}

export default Home;
