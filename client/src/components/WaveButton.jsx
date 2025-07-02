function WaveButton({text1, text2}) {
  return <div>
    <div className="mt-10 button w-fit p-10 mx-auto text-center pointer hover:scale-105 transition-all drop-shadow-[0px_5px_7px_rgba(0,0,0,.2)] hover:rotate-3">
        <p className="text-4xl text-white">{text1}</p>
        <p className="text-2xl text-white -mb-6 -mt-1">{text2}</p>
      </div>
  </div>;
}

export default WaveButton;
