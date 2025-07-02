function Card({ img, text, imgsize }) {
  return (
    <div className="pointer group h-100 w-100 border-10 border-white rounded-xl mx-auto flex flex-col bg-white/20 shadow-xl hover:bg-white/30 hover:shadow-white/40 hover:rotate-3 transition-all hover:scale-105">
      <img src={img} className={`delay-75 ${imgsize} mx-auto my-5 group-hover:rotate-5 transition-all`}></img>
      <div className="bg-white text-center flex-1 py-4">
        <p className="text-3xl group-hover:text-4xl transition-all  text-[#368b90]">{text}</p>
      </div>
    </div>
  );
}

export default Card;
