import React, { useState ,useRef} from "react";
import MainScreen from "../MainScreen";
import { useNavigate } from "react-router-dom";


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  //const auth = getAuth();
  const emailRef = useRef();
  const passRef = useRef();
  //const navigate = useNavigate();

  const handleRegister = async() => {
  }

  return (
    <MainScreen title="Register Here..." className="pt-[100px]">
      <form>
        <div className="mb-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail3" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={passRef}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

       

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Profile Picture
          </label>
          <input className="form-control" type="file" id="formFile" />
        </div>

        <div>
          <button className="btn btn-primary" onClick={handleRegister}>Submit</button>
        </div>
      </form>
    </MainScreen>
  );
}

export default Register;
