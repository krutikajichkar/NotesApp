import React, { useState } from "react";
import MainScreen from "../MainScreen";

//import Error from "../popups/Error";

//import MyNotes from "../MyNotes";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <MainScreen title="Login" className=" container">
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button className="btn btn-primary">Submit</button>
        </div>

        <div>New Customer ? Register Here</div>
      </form>
    </MainScreen>
  );
}

export default Login;
