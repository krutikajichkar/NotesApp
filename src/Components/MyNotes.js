import React, { useState, useEffect } from "react";
import MainScreen from "./MainScreen";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Loader from "./Loader";
import Error from "./popups/Error";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { addNotes, editNotes } from "../Redux/notesSlice";
import { auth } from "../Firebase";

function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [fetcherror, setFetcherror] = useState();

  const [loading, setLoading] = useState(true);

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const getNotes = async () => {
    await getDocs(collection(db, "notes")).then((response) => {
      const data = response.docs
        .filter((item) => item.data().uid === auth.currentUser.uid)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      setNotes(data);
      dispatch(addNotes(data));
      setLoading(false);
    })
    .catch((e) => setFetcherror(e.message))
  };

  const deleteHandler = async (id) => {
    const filteredData = notes.filter((note) => note.id !== id);
    setNotes(filteredData);
    dispatch(addNotes(filteredData));
    await deleteDoc(doc(db, "notes", id));
  };

  useEffect(() => {
    getNotes();
    console.log("hey tehert");
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <MainScreen
          title={`Hey ${user?.displayName} What are you Planning to do Today?`}
          className="pt-[100px] container"
        >
          {fetcherror && <Error error={fetcherror}/>}
          <Link to="createnote">
            <button className="bg-cyan-600 text-white p-2 mb-4 rounded font-semibold hover:bg-cyan-800 shadow-slate-900 ">
              Create New Note
            </button>
          </Link>

          <div className=" pb-2">
            {fetcherror && <Error error={fetcherror} />}
            {notes &&
              notes.map((ele) => {
                return (
                  <Accordion key={ele.id}>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header "
                    >
                      <div className="card w-[100%] ">
                        <div className="flex justify-between card-header items-center ">
                          <div>{ele.title}</div>
                          <div className="flex space-x-2 ">
                            <Link to="/editnotes">
                              {" "}
                              <button
                                className="text-white rounded bg-green-600 p-2 font-semibold"
                                onClick={() => dispatch(editNotes(ele.id))}
                              >
                                Edit
                              </button>
                            </Link>
                            <button
                              className="text-white rounded bg-red-600 p-2 font-semibold"
                              onClick={() => deleteHandler(ele.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="card-body">
                        <h4 className="badge text-bg-success">
                          {" "}
                          {ele.category}{" "}
                        </h4>
                        <blockquote className="blockquote mb-0">
                          <ReactMarkdown className="mt-4 prose">
                            {ele.content}
                          </ReactMarkdown>
                          <footer className="blockquote-footer pt-4">
                            Created on {new Date(ele.created_at).toDateString()}
                            {/* <cite title="Source Title">Source Title</cite> */}
                          </footer>
                        </blockquote>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
          </div>
          {notes && notes.length === 0 && (
            <div className=" w-[80%] absolute  left-[40%] right-0 top-[70%] sm:top-[50%] ">
              <h3 className="text-xs font-semibold sm:text-3xl ">No Notes Found !!</h3>
            </div>
          )}
        </MainScreen>
      )}
    </>
  );
}

export default MyNotes;
