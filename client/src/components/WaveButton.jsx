function WaveButton({ text1, text2, onClick, className }) {
  return (
    <div className={`mx-auto w-fit `+className}>
      <button className="mt-10 button w-fit p-10 mx-auto text-center pointer hover:scale-105 transition-all drop-shadow-[0px_5px_7px_rgba(0,0,0,.2)] hover:rotate-3" onClick={onClick}>
        <p className="text-4xl text-white -mt-2">{text1}</p>
        <p className="text-2xl text-white -mb-6 -mt-1">{text2}</p>
      </button>
    </div>
  );
}

export default WaveButton;
