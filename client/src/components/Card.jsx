function Card({ img, text, imgsize }) {
  return (
    <div className="pointer group md:h-100 md:w-100 h-80 w-80 md:border-10 border-8 border-white rounded-xl mx-auto flex flex-col bg-white/20 shadow-xl hover:bg-white/30 hover:shadow-white/40 hover:rotate-3 transition-all hover:scale-105">
      <img src={img} className={`delay-75 ${imgsize} mx-auto my-5 group-hover:rotate-5 transition-all`}></img>
      <div className="bg-white text-center flex-1 md:py-4 py-5">
        <p className="md:text-3xl text-2xl group-hover:md:text-4xl group-hover:text-3xl transition-all  text-[#368b90]">{text}</p>
      </div>
    </div>
  );
}

export default Card;
