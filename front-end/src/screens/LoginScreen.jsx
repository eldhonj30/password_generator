import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [pswrd, setPswrd] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let data = localStorage.getItem("userData");
    let userData = JSON.parse(data)
    if (userData?.userId) {
      navigate("/password");
    } 

  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (pswrd && email) {
      try {
        let { data } = await axios.post("/user/auth", { pswrd, email });

        let user = JSON.stringify(data);
        localStorage.setItem("userData", user);
        if (user) {
          navigate("/password");
        }
      } catch (error) {
        toast(error.response.data.error);
      }
    } else {
      setErr("Email and Password are required");
      setTimeout(() => {
        setErr("");
      }, 5000);
      return err;
    }
  };

  return (
    <div className="main-container">
      <div className="header-login">
        <h2>Login</h2>
      </div>
      <form className="cont-body">
        <div className="center">
          <h3>Email</h3>
          <input
            type="text"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target?.value.trim())}
          />
          <h3>Password</h3>
          <input
            type="password"
            className="input"
            value={pswrd}
            onChange={(e) => setPswrd(e.target?.value.trim())}
          />
          {err && <p className="errmsg1">{err}</p>}
          <button className="btn-login" onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
