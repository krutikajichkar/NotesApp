import React, { useRef, useState } from "react";
import MainScreen from "../MainScreen";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Error from "../popups/Error";
import Success from "../popups/Success";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../../Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/userSlice";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";


function Register() {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
   await createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: name.current.value,
        }).then(() => {
          const { uid, email, displayName } = auth.currentUser;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
            })
          );
          navigate("/mynotes");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode + errorMessage)
      });
  };

  return (
    <>
      <MainScreen title="Register Here..." className="pt-[100px]">
        {error && <Error error={error} />}
        {message && <Success message={message} />}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                ref={name}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                ref={email}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter the Password"
                ref={password}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <div className="flex ">
              <button className="bg-blue-500 text-white px-3 py-2 rounded-lg ">
                Register
              </button>
            </div>
            <div className="mt-2 text-[18px] ">
              {" "}
              Already have an account ?{" "}
              <Link to="login" className="text-blue-800">
                Login Here
              </Link>
            </div>
          </Row>
        </Form>
      </MainScreen>
    </>
  );
}

export default Register;
