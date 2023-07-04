import React, {  useState } from "react";
import MainScreen from "../MainScreen";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/SupabaseClient";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(false);
 
  const [selectedFile, setselectedFile] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      createUser();

      //getUser()
    }
  };

  const uploadFiles = async (id) => {
    if (selectedFile) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(id + "/" + uuidv4(), selectedFile);

      if (data) {
        console.log(data);
        console.log(selectedFile);
      }
      if (error) {
        console.log(error.message);
      }
    }
  };

  // const fileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   setselectedFile(file);
  //   console.log(selectedFile);
  // };

  const createUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (data) {
      console.log(data);
      const { user } = data;
      if (user) {
        console.log(user.id);
        uploadFiles(user.id);
        
      }
      alert("Registered Successfully ");
      navigate('/login')
    } else {
      alert(error.message);
    }
  };

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
              <Form.Label>Email</Form.Label>
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
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                required
                type="file"
                placeholder="Choose a File"
                onChange={(e) => setselectedFile(e.target.files[0])}
                
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <div className="flex ">
              <button className="bg-blue-500 text-white px-3 py-2 rounded-lg ">
                Register
              </button>
            </div>
            <div className="mt-2 text-[18px] "> Already have an account ? <Link to='login' className="text-blue-800">Login Here</Link></div>
          </Row>
        </Form>
      </MainScreen>
    </>
  );
}

export default Register;
