import Form from "../components/Form";
import Logo from "../components/Logo";
import WaveButton from "../components/WaveButton";

function Login() {
  return (
    <>
      <Logo height="h-50" />
      <p className="text-center text-white text-2xl -mt-10">
        listen to anonymous music recommendations!
      </p>
      <Form />
      <WaveButton text1={"log in!"} />
    </>
  );
}

export default Login;
