import React, {  useState,useRef } from "react";
import MainScreen from "../MainScreen";
//import { signIn } from "../../Firebase";
import { useNavigate } from "react-router-dom";

//import Error from "../popups/Error";

//import MyNotes from "../MyNotes";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailRef = useRef();
  const passRef = useRef();
  //const navigate = useNavigate();

  // const handleLogin = async() =>{
  // try{
  //   await signIn(emailRef.current.value,passRef.current.value).then((response) => {
  //     alert("Logged In successfully");
  //     navigate("/mynotes");
  //    });
    
  // }
  // catch(e){
  //   alert(e.message)
  // }

  // }

 

  return (
    <MainScreen title="Login" className=" container">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={emailRef}
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
            ref={passRef}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* <div>
          <button className="btn btn-primary" onClick={handleLogin}>Submit</button>
        </div> */}

        <div>New Customer ? Register Here</div>
      </form>
    </MainScreen>
  );
}

export default Login;
