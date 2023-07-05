import React, { useEffect, useState } from "react";
import MainScreen from "./MainScreen";
import { Form, Row } from "react-bootstrap";
import supabase from "../config/SupabaseClient";
import { getuser } from "../config/user";
import Header from "./Header/Header";
import Success from "./popups/Success";
import Error from "./popups/Error";
import Loader from './Loader'
import { useNavigate } from "react-router-dom";


const CDN =
  "https://vipfgltyzdlvkveoojpr.supabase.co/storage/v1/object/public/avatars/";
function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validated, setValidated] = useState(false);
  const [id, setid] = useState(null);
  const [profile, setprofile] = useState([]);
  const [profileUrl, setprofileUrl] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const user = getuser();
  const [loading, setLoading] = useState(true)
  

  const timestamp = new Date().getTime();
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setError("Please fill all the details");
    } else {
      setValidated(true);
      updateUser()
    }
  };

  const getMedia = async (id) => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .list(id + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data) {
      console.log(data);
      setprofile(data);
      setError(null);
      setLoading(false);
    } else {
      setError(error.message);
      console.log(error.message);
    }
  };
   
  const call = async () => {
    await user.then((response) => {
      console.log(response.id);

      setid(response.id);
      console.log(id);
      setEmail(response.email);
      console.log(email);
      setName(response.user_metadata.full_name);
      console.log(name);
    });
  };
  

  const updateProfile = async (id) => {
    console.log(profileUrl, profile[0].name);
    if (profileUrl) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .update(id + "/" + profile[0].name, profileUrl, {
          cacheControl: "3600",
          upsert: true,
        });

      if (data) {
        console.log(data);
        console.log(profileUrl);
        setError(null);
      } else {
        setError(error.message);
        console.log(error.message);
      }
    }
  };

  const updateUser = async () => {
    setMessage(
      "Updating profile.... (This could take a bit longer,Please stay with us)"
    );
    const { data, error } = await supabase.auth.updateUser({
      email: email,
      password: password,
      data: { full_name: name },
    });

    if (data) {
      console.log(data);
      alert("profile updated successfully");
      navigate('/mynotes/profile')
      setError(null);
      setLoading(true)
      updateProfile(id).then((response) => {
        window.location.reload()
        setMessage(null)
        setLoading(false)
      })
    } else {
      setError(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    call()
    console.log(CDN + id + "/" + profile[0]?.name);
    console.log(id);
    getMedia(id);
  }, [id,profile]);

  return (
    <>
      <Header />
      <MainScreen title="Edit Profile" className="mt-[100px] container">
        {error && <Error error={error} />}
        {message && <Success message={message} />}
        <div className="flex-col  justify-between">
          <center>
            {" "}
            <div className="w-[300px] h-[300px]">
              {loading && <Loader className="mt-[-30%]"/>}
              {!loading && profile && profile[0] && <img
                className="rounded-xl"
                src={
                  CDN + id + "/" + profile[0]?.name + "?timestamp=" + timestamp
                }
                alt="profile_img"
              />}
            </div>
          </center>
          <div className="mt-[-80px]">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Title"
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
                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.Control
                    required
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                    placeholder="Update Profile"
                    onChange={(e) => setprofileUrl(e.target.files[0])}
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
      </MainScreen>
    </>
  );
}

export default Profile;
