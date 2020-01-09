import React from "react";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="columns">
      <div className="column is-half is-offset-one-quarter">
        <div className="box">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
