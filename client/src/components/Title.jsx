import { Link } from "react-router";
import Logo from "./Logo";
import "animate.css";

function Title() {
  return (
    <div className=" mt-[13%]">
      <div className="flex mx-auto w-fit md:mt-0 mt-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute mt-38 drop-shadow-[0px_5px_7px_rgba(255,255,255,.8)]"
        >
          <circle r="10" cx="150" cy="50" fill="white" className="md:block hidden">
            
          </circle>
        </svg>
        <svg className="opacity-80 mt-50 lg:block hidden">
          <rect width="300" height="5" fill="white" rx="5" ry="5" />
        </svg>
        <div>
          <Logo height={"md:h-70 h-50"} />
        </div>
        <svg className="opacity-80  mt-50 lg:block hidden">
          <rect width="300" height="5" fill="white" rx="5" ry="5" />
        </svg>
      </div>
      <p className="text-center text-white md:text-5xl text-3xl lg:-mt-25 -mt-5">
        listen to anonymous music recommendations!
      </p>

      <Controls />
    </div>
  );
}

function Controls() {
  return (
    <div className="flex mx-auto w-fit gap-5 mt-10">
      <img src="./imgs/controls/prev.png" alt="" className="md:h-20 h-15 my-auto" />
      <Link
        to={"/home"}
        className="pointer hover:scale-105 transition-all hover:rotate-10"
      >
        <img src="./imgs/controls/play.png" alt="" className="md:h-26 h-21" />
      </Link>
      <img src="./imgs/controls/next.png" alt="" className="md:h-20 h-15 my-auto" />
    </div>
  );
}

export default Title;
