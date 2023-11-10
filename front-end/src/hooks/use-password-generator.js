import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkboxData, length) => {

    let char = "",
      password = "";

    let selectedOption = checkboxData.filter((checkbox) => checkbox.state);

    if (selectedOption?.length === 0) {
      setErrorMessage("Select atleast one option");
      setPassword("");
      return;
    }

    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase Letters":
          char += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters":
          char += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          char += "0123456789";
          break;
        case "Include Symbols":
          char += "@#$!%^&*?/><";
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * char.length);
      password += char[randomIndex];
    }

    setPassword(password)
    setErrorMessage("")
  };

  return { password, errorMessage, generatePassword };
};

export default usePasswordGenerator;
