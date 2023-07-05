import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import MainScreen from "./MainScreen";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import supabase from "../config/SupabaseClient";
import Header from "./Header/Header";
import Success from "./popups/Success";
import Error from "./popups/Error";
import ReactMarkdown from "react-markdown";


const CreateNote = () => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [fetchError, setfetchError] = useState(null);
  const [message, setMessage] = useState();
  const [user_id, setuser_id] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setfetchError("Please fill the required details");
    } else {
      setfetchError(null)
      setValidated(true);
      insertData();
    }
  };

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (data) {
      console.log(data.user.id);
      setuser_id(data.user.id);
    }
  };

  const insertData = async () => {
    const { error } = await supabase.from("notes").insert({
      title: title,
      content: content,
      category: category,
      userID: user_id,
    });

    if (error) {
      setfetchError(error.message);
    } else {
      setfetchError(null);
      setMessage(
        "Created note Successfully!! You can check them on My Notes OR If you want to ccreate another one , You can"
      );
      
    }
  };

  const resetHandler = () => {
    setMessage(null);
    setCategory("");
    setContent("");
    setTitle("");
  };

  useEffect(() => {
    getUser();
  }, [user_id]);
  return (
    <>
      <Header />
      <MainScreen title="Create Notes Here..." className="pt-[100px] container">
      
        {fetchError && <Error error={fetchError} />}
        {message && <Success message={message} />}
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

                {content && (
                  <Card>
                    <Card.Header>Note Preview</Card.Header>
                    <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                    </Card.Body>
                  </Card>
                )}

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
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-lg mx-3"
                    onClick={resetHandler}
                  >
                    Reset Fields
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

export default CreateNote;


