import React, { useState } from "react";
import MainScreen from "../MainScreen";
import { Link, useNavigate } from "react-router-dom";
import Error from "../popups/Error";
import {auth} from '../../Firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

//import MyNotes from "../MyNotes";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState()
   
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

   await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate('/mynotes')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  
  };

  return (
    <>
     
      <MainScreen title="Login" className=" container">
       {error && <Error error={error}/>}
       
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
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

          <div>
            <button className="btn btn-primary">Submit</button>
          </div>

          <div className="mt-2 text-[18px] ">New Customer ? <Link to='register' className="text-blue-800">Register Here</Link></div>
        </form>
      </MainScreen>
    </>
  );
}

export default Login;
