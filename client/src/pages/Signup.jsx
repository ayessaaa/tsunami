import Form from "../components/Form";
import Logo from "../components/Logo";
import WaveButton from "../components/WaveButton";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL + "/signup", {
        email,
        password,
      });

      console.log(res.data);
      navigate("/home");
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
    }
  }

  return (
    <>
      <Logo height="md:h-50 h-40" />
      <p className="text-center text-[white] md:text-2xl text-xl -mt-10">
        listen to anonymous music recommendations!
      </p>
      <Form
        error={error}
        handleSubmit={handleSubmit}
        type="signup"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </>
  );
}

export default Signup;
