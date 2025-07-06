import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/App";
import Home from "./pages/Home"
import WriteLetter from "./pages/WriteLetter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenLetter from "./pages/OpenLetter";
import MyLetters from "./pages/MyLetters";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/log-in" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/write-letter" element={<WriteLetter />} />
      <Route path="/open-letter" element={<OpenLetter />} />
      <Route path="/my-letters" element={<MyLetters />} />
    </Routes>
  </BrowserRouter>
);
