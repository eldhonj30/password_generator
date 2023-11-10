import React, { useState } from "react";
import "./style.css"

function App() {

  const [length,setLength] = useState(4)
  const [checkboxData,setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ])

    const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">password</div>
        <button className="copyBtn">copy</button>
      </div>
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input type="range" min="4" max="20" value={length} onChange={(e) => setLength(e.target.value)} />
      </div>
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <div key={index}>
              <input type="checkbox" checked={checkbox.state} onChange={()=>handleCheckboxChange(index)} />
              <label>{checkbox.title}</label>
            </div>
          );
        })}
      </div>
      <button className="generateBtn">Generate Password</button>
    </div>
  );
}

export default App;
