function WaveButton({ text1, text2, onClick, className }) {
  return (
    <div className={`mx-auto w-fit `+className}>
      <button className="*:transition-all mt-10 button w-fit p-10 mx-auto text-center pointer hover:scale-105 transition-all drop-shadow-[0px_5px_7px_rgba(0,0,0,.2)] hover:rotate-3" onClick={onClick}>
        <p className="md:text-4xl text-3xl text-white -mt-2">{text1}</p>
        <p className="md:text-2xl text-xl text-white -mb-6 -mt-1">{text2}</p>
      </button>
    </div>
  );
}

export default WaveButton;
