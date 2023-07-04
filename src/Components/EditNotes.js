import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import MainScreen from "./MainScreen";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import supabase from "../config/SupabaseClient";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";


const EditNotes = () => {
    const [notes, setNotes] = useState([]);
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState(notes[0]?.title);
  const [content, setContent] = useState(notes[0]?.content);
  const [category, setCategory] = useState("");
  
  //const [fetchError, setfetchError] = useState(null);
  const navigate = useNavigate();
  const id = localStorage.getItem("editId");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    alert("Edited note Successfully!!");
    navigate("/mynotes");
  };

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("id", id);

    if (error) {
      console.log(error);
    }

    if (data && data.length > 0) {
        setNotes(data);
        const note = data[0];
        setTitle(note.title);
        setCategory(note.category);
        setContent(note.content);
      }
    console.log(localStorage.getItem("editId"), title);
  };

  const editHandler = async () => {
    const {error } = await supabase
      .from("notes")
      .update({  title:title,  content:content,  category:category })
      .eq("id", id)
      .select()

      if(error){
        console.log(error)
      }
  };

  useEffect(() => {
    fetchData();
    
  }, []);

  // const resetHandler = () => {
  //   setCategory('');
  //   setContent('');
  //   setTitle('')
  // }
  return (
    <>
    
   <Header/>
   <MainScreen title="Edit Notes Here..." className="pt-[100px] container">
      
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
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg "
                  onClick={editHandler}
                >
                  Edit
                </button>
              </div>
            </Row>
          </Form>
        </Card.Body>
        <Card.Footer className="italic">
          Created at {new Date().toDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
    </>
  );
};

export default EditNotes;
