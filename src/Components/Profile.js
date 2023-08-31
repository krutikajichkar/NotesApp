import React, { useState } from "react";
import MainScreen from "./MainScreen";
import { Form, Row } from "react-bootstrap";
import { DEFAULT_PROFILE } from "../config/constants";
import Success from "./popups/Success";
import Error from "./popups/Error";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../Firebase";
import { updateProfile } from "firebase/auth";
import { addUser } from "../Redux/userSlice";

function Profile() {
  const user = useSelector((store) => store.user);
  const [name, setName] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(!selectedFile){
      setError("Fill The Details Correctly");
      return;
    }

    const fileRef = ref(storage, auth.currentUser.uid + ".png");

    setLoading(true);
    const snapshot = await uploadBytes(fileRef, selectedFile);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(auth.currentUser, {
      email: email,
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        const { uid, email, displayName, photoURL } = auth.currentUser;

        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        setLoading(false);
        setError(null)
        setMessage("Your Account Updated Successfully!!");
      })
      .catch((e) => {
        setError(e.message);
      });
  };



  return (
    <>
      <MainScreen title="Edit Profile" className="mt-[100px] container">
        {error && <Error error={error} />}
        {message && <Success message={message} />}
        {loading && <Loader className="mt-[-30%]" />}
        {!loading && (
          <div className="flex-col  justify-between">
            <center>
              <div>
                <img
                  className="w-[200px] rounded-full"
                  src={!user.photoURL ? DEFAULT_PROFILE : user.photoURL}
                  alt=""
                />
              </div>
            </center>
            <div>
              <Form noValidate onSubmit={handleSubmit}>
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
                  <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formFile">
                    <Form.Label>Want to add Profile Picture ?</Form.Label>
                    <Form.Control
                      required
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                      placeholder="Update Profile"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <div className="text-center">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg  mb-[70px]"
                      type="submit"
                     
                    >
                      Update
                    </button>
                  </div>
                </Row>
              </Form>
            </div>
          </div>
        )}
      </MainScreen>
    </>
  );
}

export default Profile;
