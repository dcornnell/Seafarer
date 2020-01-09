import React from "react";
import UserForm from "../components/UserForm";

function SignUp() {
  return (
    <div className="columns">
      <div className="column is-half is-offset-one-quarter">
        <div className="box">
          <UserForm />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
