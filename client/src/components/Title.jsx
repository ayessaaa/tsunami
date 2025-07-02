import Logo from "./Logo";
import 'animate.css';

function Title() {
  return (
    <div className=" mt-[13%] p-10">
      <div className="flex mx-auto w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute mt-38 drop-shadow-[0px_5px_7px_rgba(255,255,255,.8)]"
        >
          <circle r="10" cx="20" cy="50" fill="white">
            <animate
              attributeName="cx"
              begin="0s"
              dur="10s"
              from="20"
              to="90%"
              repeatCount=""
            />
          </circle>
        </svg>
        <svg className="opacity-80 mt-50">
          <rect width="300" height="5" fill="white" rx="5" ry="5" />
        </svg>
        <div>
          <Logo height={"h-70"} />
        </div>
        <svg className="opacity-70  mt-50">
          <rect width="300" height="5" fill="white" rx="5" ry="5" />
        </svg>
      </div>
      <p className="text-center text-white text-5xl -mt-25">
        listen to anonymous music recommendations!
      </p>

      <Controls />
    </div>
  );
}

function Controls(){
  return (
    <div className="flex mx-auto w-fit gap-5 mt-10">
        <img src="./imgs/controls/prev.png" alt="" className="h-20 my-auto" />
        <img src="./imgs/controls/play.png" alt="" className="h-26" />
        <img src="./imgs/controls/next.png" alt="" className="h-20 my-auto" />
      </div>
  )
}

export default Title;
