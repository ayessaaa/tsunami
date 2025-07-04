import { Link, useNavigate } from "react-router"; 
import { useEffect } from "react";
import axios from "axios";

import Card from "../components/Card";
import Letter from "../components/Letter";
import Logo from "../components/Logo";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.get(API_URL+"/check-auth", {
          withCredentials: true,
        });
        console.log("Authenticated:", data);
      } catch (err) {
        console.log("Auth failed:", err.response?.data || err.message);
        navigate("/log-in");
      }
    };

    verifyCookie();
  }, [navigate]);

  return (
    <>
      <div className="mt-30">
        <Logo height={"h-50"} />
        <p className="text-center text-white text-2xl -mt-10">
          listen to anonymous music recommendations!
        </p>
      </div>
      <div className="flex w-fit mx-auto gap-15 mt-15">
        <Link to={"/open-letter"}>
        <Card
          img="./imgs/drawings/bottle2.png"
          text="open a letter"
          imgsize="size-70"
        />
        </Link>
        <Link to={"/write-letter"}>
        <Card
          img="./imgs/drawings/letter2.png"
          text="write a letter"
          imgsize="size-70"
        />
        </Link>
      </div>
    </>
  );
}

export default Home;
