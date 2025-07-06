import { Link } from "react-router";
import LetterCard from "../components/LetterCard";
import Logo from "../components/Logo";

function MyLetters() {
  return (
    <div>
      <div className="">
        <Logo height={"h-50"} />
        <p className="text-center text-white text-2xl -mt-10">
          listen to anonymous music recommendations!
        </p>
      </div>
      <div className="bg-[#368b90]/30 border-10 border-[#368b90] py-5 w-200 mx-auto px-5 rounded-2xl mt-10">
        <p className="w-fit ml-auto text-6xl text-white -mt-5 mr-0 hover:rotate-10  transition-all">
          <Link className="pointer" to={"/home"}>
            x
          </Link>
        </p>
        <img src="./imgs/drawings/scroll.png" className="size-20 mx-auto -mt-10"></img>
        <p className="text-center text-4xl text-white">my letters</p>
        <div>
          <div className="pt-5 pb-3 px-18 h-full w-full -mt-10">
            <p
              className={`text-4xl transition-all duration-1000 text-center  `}
            >
              &nbsp;
            </p>
            <div className=" flex gap-2 mx-auto w-fit">
              <div
                className={` letter2 flex gap-3 p-4 rounded-lg h-fit  transition-all pointer w-80 hover:scale-105
                   `}
              >
                <img
                  src={"./imgs/song/cover_default.png"}
                  className="h-16 rounded-xl"
                ></img>
                <div className="mt-auto">
                  <p className="text-2xl text-[#81724A]">
                    {/* {animation2 ? musicTitle : ""} */}asda
                  </p>
                  <p className="text-xl -mt-1 text-white/80 -mb-1">
                    {/* {animation2 ? musicArtist : ""} */}asdsad
                  </p>
                </div>
              </div>
              <div className="letter3 text-center text-white px-3 flex flex-col rounded-lg ">
                <p className="text-5xl mt-auto">0</p>
                <p className="text-2xl text-[#81724A] mb-1 -mt-2">replies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLetters;
