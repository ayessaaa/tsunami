import Letter from "../components/Letter";
import Logo from "../components/Logo";
import WaveButton from "../components/WaveButton";

function WriteLetter() {
  return (
    <div>
      <Logo height="h-50" />
      <p className="text-center text-white text-2xl -mt-10">
        listen to anonymous music recommendations!
      </p>
      <div className="mt-15">
        <p className="text-center text-4xl text-white mb-5">
          write a letter and a music reco ofc :)
        </p>
        <Letter />
      </div>
      <WaveButton text1="throw it to the sea" text2="ship! ship!"/>
    </div>
  );
}

export default WriteLetter;
