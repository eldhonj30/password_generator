import React, { useEffect, useState } from "react";
import "../style.css";
import usePasswordGenerator from "../hooks/use-password-generator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"

const PasswordScreen = () => {
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const [load,setLoad] = useState(false)
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [svdPswrd, setSvdPswrd] = useState([])
  const navigate = useNavigate();
  const { password, errorMessage, generatePassword } = usePasswordGenerator();
  let data = localStorage.getItem("userData");
  let userData = JSON.parse(data);

  useEffect(() => {
    if (userData?.userId) {
      navigate("/password");
    } else {
      navigate("/")
    }
  }, [load]);

  useEffect(()=>{
    axios.get(`/user/password?id=${userData?.userId}`).then(({data}) => {
      setSvdPswrd([...data.password])
    });
  },[load])

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSave = async () => {
  try {
      if (password) {
        let id = userData.userId;
        await axios.post("/user/password", { password, id });
         setLoad((prev) => !prev);
        toast.success("Password saved succesfully")
      } 
  } catch (error) {
    toast.error(error.response.data.error);
  }
  }

  const handleLogout = () => {
    localStorage.clear();
    setLoad((prev)=>!prev)
  }
  return (
    <>
      <div className="container">
        <div className="logout">
          <button onClick={handleLogout}>Log Out</button>
        </div>
        {password && (
          <div className="header">
            <div className="title">{password}</div>
            <div>
              <button className="copyBtn" onClick={handleCopy}>
                {copied ? "copied" : "copy"}
              </button>
              <button onClick={handleSave} className="btn">
                Save
              </button>
            </div>
          </div>
        )}
        <div className="charlength">
          <span>
            <label>Character Length</label>
            <label>{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="checkboxes">
          {checkboxData.map((checkbox, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={checkbox.state}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label>{checkbox.title}</label>
              </div>
            );
          })}
        </div>
        {errorMessage && <div className="errmsg">{errorMessage}</div>}
        <button
          className="generateBtn"
          onClick={() => generatePassword(checkboxData, length)}
        >
          Generate Password
        </button>
      </div>
      {svdPswrd?.length && (
        <div className="main">
          <h3>Saved Passwords</h3>
          <div className="table">
           {svdPswrd.map((pswrd,index) =>(
             <div key={index} className="pswrd-holder">
               <p>{pswrd}</p>
             </div>
           ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordScreen;
