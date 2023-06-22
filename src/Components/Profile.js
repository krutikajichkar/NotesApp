import React,{useState} from 'react'
import MainScreen from './MainScreen'
import { Form,Row } from 'react-bootstrap'

function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <MainScreen title="Edit Profile" className="mt-[100px] container">

      <div className='flex justify-between'>
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
                  placeholder="Choose a File"
                 
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <div><button className='px-4 py-3 bg-blue-500 text-white rounded-lg' type='submit'>Update</button></div>
              </Row>
            </Form>
        </div>
        <div className='w-[300px] h-[300px] '>
          <img src="https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg" alt="profile_img" />
        </div>
      </div>

      

    </MainScreen>
  )
}

export default Profile