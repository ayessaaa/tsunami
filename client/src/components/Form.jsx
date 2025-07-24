import { Link } from "react-router";
import WaveButton from "./WaveButton";

function Form({ handleSubmit, type, email, setEmail, password, setPassword, error }) {
  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
      <div
        className={`pb-10 md:w-120 w-90 border-10  rounded-3xl mx-auto mt-30 transition-all  ${
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
            className={` md:px-13 px-8 rounded-2xl py-2 -mt-1.5 ${
              type === "signup" ? "bg-[#368b90]" : "bg-white"
            }`}
          >
            <p
              className={`md:text-4xl text-3xl text-center transition-all ${
                type === "signup" ? "text-white" : "text-[#368b90]"
              }`}
            >
              {type === "signup" ? "sign up" : "log in"}
            </p>
          </div>
        </div>

        {error !== "" ? <div className="bg-red-400/30 mx-10 border-red-400/40 border- py-1 text-center text-red-200 text-lg md:text-xl rounded-2xl mt-5">{error}</div>:""}

        

        <div
          className={`*:transition-all md:px-13 px-8  ${
            type === "signup" ? "text-[#368b90]" : "text-white"
          } ${error !== "" ? "mt-5":"mt-10"}`}
        >
          <p className="md:text-3xl text-2xl">email</p>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full px-3 py-1 md:text-xl text-lg bg-white rounded-xl text-[#368b90] focus:bg-[#368b90] focus:text-white transition-all active:scale-102 focus:outline-0 focus:ring-3 focus:ring-[#286e72]"
          ></input>
          <p className="md:text-3xl text-2xl mt-5">password</p>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full px-3 py-1 md:text-xl text-lg bg-white rounded-xl text-[#368b90] focus:bg-[#368b90] focus:text-white transition-all active:scale-102 focus:outline-0 focus:ring-3 focus:ring-[#286e72]"
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
