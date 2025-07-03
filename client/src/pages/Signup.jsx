import Form from "../components/Form";
import Logo from "../components/Logo";
import WaveButton from "../components/WaveButton";

function Signup() {
  return (
    <>
      <Logo height="h-50" />
      <p className="text-center text-[white] text-2xl -mt-10">
        listen to anonymous music recommendations!
      </p>
      <Form type="signup"/>
      <WaveButton text1={"sign up!"} />
    </>
  );
}

export default Signup;
