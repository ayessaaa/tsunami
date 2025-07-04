import Form from "../components/Form";
import Logo from "../components/Logo";
import WaveButton from "../components/WaveButton";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  axios.defaults.withCredentials = true;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL+"/login", {
        email,
        password,
      });

      console.log(res.data);
      if (res.data.auth){
        navigate("/home")
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Logo height="h-50" />
      <p className="text-center text-white text-2xl -mt-10">
        listen to anonymous music recommendations!
      </p>
      <Form handleSubmit={handleSubmit} type={"login"} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
    </>
  );
}

export default Login;
