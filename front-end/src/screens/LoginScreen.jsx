import React from 'react'

const LoginScreen = () => {
  return (
    <div className="main-container">
      <div className="header-login">
        <h2>Login</h2>
      </div>
      <div className='cont-body'>
        <div className="center">
          <h3>User Name</h3>
          <input type="text" className="input" />
          <h3>Password</h3>
          <input type="password" className="input" />
          <button className="btn-login">Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen