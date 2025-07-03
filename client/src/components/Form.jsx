import { Link } from "react-router";

function Form() {
  return (
    <div>
      <div className="pb-10 w-120 border-10 border-white bg-white/30 rounded-3xl mx-auto mt-30">
        <div className="-mt-25 w-fit mx-auto  ">
          <img
            src="./imgs/drawings/shark_facing.png"
            alt=""
            className="h-20 mx-auto "
          />
          <div className="bg-white px-13 rounded-2xl py-2 -mt-1.5">
            <p className="text-4xl text-[#368b90] text-center">log in</p>
          </div>
        </div>
        <form className="text-white px-13 mt-10">
          <p className="text-3xl">username / email</p>
          <input className=" w-full px-3 py-1 text-xl bg-white rounded-xl text-[#368b90] focus:bg-[#368b90] focus:text-white transition-all active:scale-102 focus:outline-0 focus:ring-3 focus:ring-[#286e72]"></input>
          <p className="text-3xl mt-5">password</p>
          <input type="password" className="w-full px-3 py-1 text-xl bg-white rounded-xl text-[#368b90] focus:bg-[#368b90] focus:text-white transition-all active:scale-102 focus:outline-0 focus:ring-3 focus:ring-[#286e72]"></input>
        </form>
        <div className="mx-auto w-fit mt-10">

        <Link to={"/sign-up"} className="pointer mx-auto text-center w-fit underline text-xl text-[#368b90] hover:decoration-wavy hover:underline-offset-3 transition-all">sign up instead?</Link>
        </div>
      </div>
    </div>
  );
}

export default Form;
