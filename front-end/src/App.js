import React from "react";
import {Route, Routes} from "react-router-dom"
import PasswordScreen from "./screens/PasswordScreen";
import LoginScreen from "./screens/LoginScreen";
import SignuUp from "./screens/SignuUp";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000" 
axios.defaults.withCredentials = true;


function App() {
 
  return (
    <Routes>
      <Route index element={<LoginScreen/>} />
      <Route path="/password" element={<PasswordScreen/>} />
      <Route path="/signup" element={<SignuUp/>}/>
    </Routes>
  );
}

export default App;
