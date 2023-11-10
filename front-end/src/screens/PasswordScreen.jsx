import React, { useState } from "react";
import "../style.css";
import usePasswordGenerator from "../hooks/use-password-generator";

const PasswordScreen = () => {

   const [length, setLength] = useState(4);
   const [copied, setCopied] = useState(false);
   const [checkboxData, setCheckboxData] = useState([
     { title: "Include Uppercase Letters", state: false },
     { title: "Include Lowercase Letters", state: false },
     { title: "Include Numbers", state: false },
     { title: "Include Symbols", state: false },
   ]);
   const { password, errorMessage, generatePassword } = usePasswordGenerator();

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
  return (
    <div className="container">
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <div>
            <button className="copyBtn" onClick={handleCopy}>
              {copied ? "copied" : "copy"}
            </button>
            <button className="btn">Save</button>
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
  );
}

export default PasswordScreen