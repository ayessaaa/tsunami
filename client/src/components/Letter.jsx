import Logo from "./Logo";

function Letter() {
  return (
    <form>
      <div className="letter  w-[50%] mx-auto py-10  text-[#82734B] drop-shadow-[0px_5px_7px_rgba(0,0,0,.2)]">
        <p className="w-fit ml-auto text-6xl pointer text-white -mt-10 mr-3">
          x
        </p>
        <div className="pt-5 pb-3 px-18 h-full w-full -mt-10">
          <p className="text-4xl">message:</p>
          <textarea className="text bg-[#BBAC7A]/40 rounded-xl w-full text-3xl py-3 px-5 mt-3 hover:bg-[#BBAC7A]/50 transition-all active:scale-102 focus:ring-3 focus:ring-[#BBAC7A] focus:outline-0 focus:bg-[#BBAC7A]/50"></textarea>
          <div className="mt-5 flex gap-10">
            <div className="">
              <p className="text-4xl">search a song:</p>
              <input
                type="text"
                className="bg-[#BBAC7A]/40 rounded-xl w-full text-2xl py-1 px-3 mt-3 hover:bg-[#BBAC7A]/50 transition-all active:scale-102 focus:ring-3 focus:ring-[#BBAC7A] focus:outline-0 focus:bg-[#BBAC7A]/50"
              />
            </div>
            <div className="flex gap-3 bg-white/40 p-4 rounded-xl">
              <img
                src="./imgs/song/cover.jpg"
                className="h-16 rounded-xl"
              ></img>
              <div className="mt-auto">
                <p className="text-2xl">take a chance with me</p>
                <p className="text-xl -mt-1 text-[#82734B]/70 -mb-1">NIKI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Letter;
