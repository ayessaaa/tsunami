import { Link } from "react-router";
import WaveButton from "./WaveButton";

function Form({ handleSubmit, type, email, setEmail, password, setPassword }) {
  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
      <div
        className={`pb-10 w-120 border-10  rounded-3xl mx-auto mt-30  ${
          type === "signup"
            ? "border-white bg-white/30"
            : "border-[#368b90] bg-[#368b90]/30"
        }`}
      >
        <div className="-mt-25 w-fit mx-auto  ">
          <img
            src="./imgs/drawings/shark_facing.png"
            alt=""
            className="h-20 mx-auto "
          />
          <div
            className={` px-13 rounded-2xl py-2 -mt-1.5 ${
              type === "signup" ? "bg-[#368b90]" : "bg-white"
            }`}
          >
            <p
              className={`text-4xl text-center ${
                type === "signup" ? "text-white" : "text-[#368b90]"
              }`}
            >
              {type === "signup" ? "sign up" : "log in"}
            </p>
          </div>
        </div>

        <div
          className={` px-13 mt-10 ${
            type === "signup" ? "text-[#368b90]" : "text-white"
          }`}
        >
          <p className="text-3xl">email</p>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full px-3 py-1 text-xl bg-white rounded-xl text-[#368b90] focus:bg-[#368b90] focus:text-white transition-all active:scale-102 focus:outline-0 focus:ring-3 focus:ring-[#286e72]"
          ></input>
          <p className="text-3xl mt-5">password</p>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full px-3 py-1 text-xl bg-white rounded-xl text-[#368b90] focus:bg-[#368b90] focus:text-white transition-all active:scale-102 focus:outline-0 focus:ring-3 focus:ring-[#286e72]"
          ></input>
        </div>
        <div className="mx-auto w-fit mt-10 ">
          <Link
            to={type === "signup" ? "/log-in" : "/sign-up"}
            className={`pointer mx-auto text-center w-fit underline text-xl hover:decoration-wavy hover:underline-offset-3 transition-all ${
              type === "signup" ? "text-[#368b90]" : "text-white"
            }`}
          >
            {type === "signup"
              ? "already have an account?"
              : "create an account?"}
          </Link>
        </div>
      </div>
      <WaveButton text1={type === "signup" ? "sign up!" : "log in!"} />
    </form>
  );
}

export default Form;
