import React, { useState } from "react";
import MainScreen from "../MainScreen";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [name, setName] = useState();

  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <MainScreen title="Register Here..." className="pt-[100px]">
      <form>
        <div className="mb-3">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div class="mb-3">
          <label for="formFile" class="form-label">
            Profile Picture
          </label>
          <input class="form-control" type="file" id="formFile" />
        </div>

        <div>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </MainScreen>
  );
}

export default Register;
