import { Link } from "react-router";

function MyLettersButton() {
  return (
    <Link to={"/my-letters"}>
      <div className="fixed right-5 bottom-5 md:right-15 md:bottom-15 flex justify-center items-center bg-white/30 group border-white/50 md:border-8 border-5 rounded-full w-fit md:p-2 py-1 shadow-xl pointer hover:scale-105 hover:border-[#368b90] hover:bg-[#368b90]/50 transition-all">
        <div className="pl-5 h-fit">
          <p className="group-hover:opacity-100 opacity-0 group-hover:mr-0 -mr-35 transition-all text-white md:text-3xl text-xl text-center duration-1000">
            my letters
          </p>
        </div>
        <img
          className="md:size-18 size-12 transition-all delay-75 group-hover:rotate-10 mr-5"
          src="./imgs/drawings/scroll.png"
        />
      </div>
    </Link>
  );
}

export default MyLettersButton;
      