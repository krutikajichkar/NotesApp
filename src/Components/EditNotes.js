import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import MainScreen from "./MainScreen";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useSelector } from "react-redux";
import Error from "./popups/Error";
import Success from "./popups/Success";

const EditNotes = () => {
  const getNotes = useSelector((store) => store.notes);
  const data = getNotes?.notes?.filter(
    (note) => note.id === getNotes?.editNoteId
  );

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState(data[0]?.title);
  const [content, setContent] = useState(data[0]?.content);
  const [category, setCategory] = useState(data[0]?.category);

  //const [fetchError, setfetchError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const editHandler = async () => {
    const noteRef = doc(db, "notes", getNotes?.noteId);
    await updateDoc(noteRef, {
      title: title,
      content: content,
      category: category,
    })
      .then(() => {
        setError(null)
        setMessage("Notes Updated Successfully!");
        navigate("/mynotes");
      })
      .catch((e) => setError(e.message));
  };

  if (!data) return;

  return (
    <>
      <MainScreen title="Edit Notes Here..." className="pt-[100px] container">
        {error && <Error error={error} />}
        {message && <Success message={message} />}
        <Card>
          <Card.Header>Edit a Note</Card.Header>
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
                    style={{ height: "200px" }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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

                <div className="flex gap-3">
                  <button
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg "
                    onClick={editHandler}
                  >
                    Edit
                  </button>
                  <Link to="/mynotes">
                    {" "}
                    <button className="bg-red-500 text-white px-3 py-2 rounded-lg ">
                      Back
                    </button>
                  </Link>
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
