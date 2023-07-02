import React, { useEffect, useState } from "react";
import MainScreen from "./MainScreen";
import { Form, Row } from "react-bootstrap";
import supabase from "../config/SupabaseClient";
import { getuser } from "../config/user";
import { v4 as uuidv4 } from "uuid";

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
  const user = getuser();

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
    } else {
      console.log(error.message);
    }
  };

 
 

  async function call() {
    await user.then((response) => {
      console.log(response.id);
      getMedia(response.id);
      setid(response.id);
      console.log(id)
      setEmail(response.email);
      console.log(email)
      setName(response.user_metadata.full_name);
      console.log(name)
      
    });
  }

  const updateProfile = async (id ) => {
    if (profileUrl) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .update(id + "/" + uuidv4(), profileUrl,{
          cacheControl: '3600',
          upsert: true
        });

      if (data) {
        console.log(data);
        console.log(profileUrl);
      }
      if (error) {
        console.log(error.message);
      }
    }
  };

  const updateUser = async () => {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if(data){
      console.log(data)
      updateProfile(id);
      alert("profile updated successfully")
      
    }
    else{
      console.log(error.message)
    }
  };


  useEffect(() => {
    call();
    console.log(CDN + id + "/" + profile[0]?.name);
    console.log(id);
  }, [id]);

  return (
    <MainScreen title="Edit Profile" className="mt-[100px] container">
      <div className="flex justify-between">
        <div>
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
                  placeholder="Update Profile"
                  onChange={(e) => setprofileUrl(e.target.files[0])}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <div>
                <button
                  className="px-4 py-3 bg-blue-500 text-white rounded-lg"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </Row>
          </Form>
        </div>
        <div className="w-[300px] h-[300px] ">
          <img src={CDN + id + "/" + profile[0]?.name} alt="profile_img" />
        </div>
      </div>
    </MainScreen>
  );
}

export default Profile;
