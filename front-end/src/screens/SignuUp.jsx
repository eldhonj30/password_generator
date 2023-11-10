import React from 'react'

const SignuUp = () => {
  return (
    <div className="main-container-signup">
      <div className="header-login">
        <h2>SignUp</h2>
      </div>
      <div className="cont-body">
        <div className="center">
          <h3>User Name</h3>
          <input type="text" className="input" />
          <h3>Email</h3>
          <input type="text" className="input" />
          <h3>Password</h3>
          <input type="password" className="input" />
          <button className="btn-login">Signup</button>
        </div>
      </div>
    </div>
  );
}

export default SignuUp