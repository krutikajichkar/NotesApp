import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import MainScreen from "./MainScreen";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Header from "./Header/Header";
import Success from "./popups/Success";
import Error from "./popups/Error";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { auth } from "../Firebase";

const CreateNote = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [fetchError, setfetchError] = useState(null);
  const [message, setMessage] = useState();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const addNoteshandler = async () => {
    await addDoc(collection(db, "notes"), {
      title: title,
      category: category,
      content: content,
      uid: auth.currentUser.uid,
      created_at: new Date().toDateString(),
    })
      .then(() => {
        setfetchError(null);
        setMessage("Notes created Successfully");
        navigate("/mynotes");
      })
      .catch((e) => {
        setfetchError(e.message);
      });
  };

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  return (
    <>
      <Header />
      <MainScreen title="Create Notes Here..." className="pt-[100px] container">
        {fetchError && <Error error={fetchError} />}
        {message && <Success message={message} />}
        <Card>
          <Card.Header>Create a Note</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
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
                    style={{ height: "200px" }}
                  />
                </Form.Group>

                {content && (
                  <Card>
                    <Card.Header>Note Preview</Card.Header>
                    <Card.Body>
                      <ReactMarkdown className="prose">{content}</ReactMarkdown>
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
                  <button
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg "
                    onClick={addNoteshandler}
                  >
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
