import { useState } from "react"

const usePasswordGenerator = () => {

  const [password,setPassword] = useState('')
  const [errorMessage,setErrorMessage] = useState('')

  const generatePassword = () => {}

  return {password,errorMessage,generatePassword}
}

export default usePasswordGenerator;