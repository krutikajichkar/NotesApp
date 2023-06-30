import React, { useState, useRef } from "react";
import MainScreen from "../MainScreen";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/SupabaseClient";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Header from "../Header/Header";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(false);
  const [userId, setuserId] = useState()

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    createUser();
    addId();
  };

  const createUser = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      if (error) {
        alert(error.message);
      }
      if (data) {
        console.log(data);
      }
      alert("Registered Successfully ");
      navigate('/login')
      setuserId(data.user.id);
      console.log(userId)
    } catch (error) {
      alert(error.message);
    }
  };

  const addId = async() => {
    const {error} = await supabase
    .from('notes')
    .insert({userId : userId})

    if(error){
      alert(error.message)
    }
  }

  // const handleRegister = async (email,password,e) => {
  //    e.preventDefault();
  // try{
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password,
  //   });

  //   if (data) {
  //     console.log(data);
  //     alert("Registered successfully!");
  //       navigate('/login');
  //   }
  //   if (error) {
  //     console.log(error.message);
  //     alert(error.message);
  //   }

  //   console.log(data);
  // }
  // catch(e){
  //   alert.log(e.message)
  // }

  // };

  return (
    <>
      
      <MainScreen title="Register Here..." className="pt-[100px]">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter the Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <div className="flex ">
              <button className="bg-blue-500 text-white px-3 py-2 rounded-lg ">
                Register
              </button>
            </div>
          </Row>
        </Form>
      </MainScreen>
    </>
  );
}

export default Register;
