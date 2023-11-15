import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const SignuUp = () => {

    const [pswrd, setPswrd] = useState("");
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [err, setErr] = useState("");

    const navigate = useNavigate()
   
    const handleSignUp = async (e) => {
      e.preventDefault()
      if(name && pswrd && email){
        try {
          const user = await axios.post("/user/signup", { name, pswrd, email });
          if(user){
            navigate('/')
          }
        } catch (error) {
          toast(error.response.data.error)
        }
      } else {
         setErr("Please fill out all the given fields");
         setTimeout(() => {
           setErr("")
         }, 5000)
         return err;
      }
    }
  return (
    <div className="main-container-signup">
      <div className="header-login">
        <h2>SignUp</h2>
      </div>
      <form className="cont-body">
        <div className="center">
          <h3>User Name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value.trim());
            }}
            className="input"
          />
          <h3>Email</h3>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.trim());
            }}
            className="input"
          />
          <h3>Password</h3>
          <input
            type="password"
            value={pswrd}
            onChange={(e) => {
              setPswrd(e.target.value.trim());
            }}
            className="input"
          />
          {err && <p className="errmsg1">{err}</p>}
          <button onClick={handleSignUp} className="btn-login">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignuUp