import { Link } from "react-router";

function MyLettersButton() {
  return (
    <Link to={"/my-letters"}>
    <div className=" justify-center items-center flex bg-white/30 group border-white/50 border-8 rounded-full w-fit p-2 right-15 bottom-15 absolute shadow-xl pointer hover:scale-105 hover:border-[#368b90] hover:bg-[#368b90]/50 transition-all">
      <div className="pl-5 h-fit">
        <p className="group-hover:opacity-100 opacity-0 group-hover:mr-0 -mr-35 transition-all text-white text-3xl text-center duration-1000">
          my letters
        </p>
      </div>
      <img
        className="size-18 transition-all delay-75 group-hover:rotate-10 mr-5"
        src="./imgs/drawings/scroll.png"
      />
    </div></Link>
  );
}

export default MyLettersButton;
