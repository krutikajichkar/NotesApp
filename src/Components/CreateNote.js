import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import MainScreen from "./MainScreen";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import supabase from "../config/SupabaseClient";
import { useNavigate } from "react-router-dom";
//import Success from "./popups/Success"; 

const CreateNote = () => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [fetchError, setfetchError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    insertData();
    alert("Created note Successfully!!");
    navigate('/mynotes');

  };

  const insertData = async() => {
    const {error} = await supabase
    .from('notes')
    .insert({title:title , content:content , category:category})

    if(error){
      fetchError(error);
    }
  }

  const resetHandler = () => {
    setCategory('');
    setContent('');
    setTitle('')
  }
  return (
    <MainScreen title="Create Notes Here..." className="pt-[100px] container">
      {fetchError && (<p>{fetchError}</p>)}
      <Card>
        <Card.Header>Create a Note</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationCustom02">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  aria-label="With textarea"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="validationCustom03">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter the category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <div className="flex ">
                <button className="bg-blue-500 text-white px-3 py-2 rounded-lg ">
                  Create
                </button>
                <button className="bg-red-500 text-white px-3 py-2 rounded-lg mx-3" onClick={resetHandler}>
                  Reset Fields
                </button>
              </div>
            </Row>
          </Form>
          
        </Card.Body>
        <Card.Footer className="italic">Created at {new Date().toDateString()}</Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNote;
