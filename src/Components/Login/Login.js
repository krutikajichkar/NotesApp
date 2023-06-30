import React, {  useState,useRef } from "react";
import MainScreen from "../MainScreen";
//import { signIn } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/SupabaseClient";
import Header from "../Header/Header";

//import Error from "../popups/Error";

//import MyNotes from "../MyNotes";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const navigate = useNavigate()
  
const handleSubmit = async(e) => {
e.preventDefault();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if(data){
    console.log(data);
    
    navigate('/mynotes')
  }

  if(error){
    alert(error.message)
  }
  
}

 

  return (
  <>
    <MainScreen title="Login" className=" container">
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
          <button className="btn btn-primary" >Submit</button>
        </div>

        <div>New Customer ? Register Here</div>
      </form>
    </MainScreen>
  </>
  );
}

export default Login;
