import React, { useState } from "react";
import MainScreen from "../MainScreen";
//import { signIn } from "../../Firebase";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/SupabaseClient";
import Error from "../popups/Error";
import HeaderAuth from "../Header/HeaderAuth";

//import MyNotes from "../MyNotes";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState()
   
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (data.user) {
      console.log(data); 
      navigate('/mynotes')  
    }
    else  {
      setError(error.message);
      console.log(error.message)
    }
  };

  return (
    <>
      <HeaderAuth/>
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
