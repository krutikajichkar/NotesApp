import React, { useState, useEffect } from "react";
import MainScreen from "./MainScreen";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Loader from "./Loader";
import Error from "./popups/Error";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector } from "react-redux";
import { collection, doc, getDocs } from "firebase/firestore"; 
import {db} from '../Firebase'

function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [fetcherror, setFetcherror] = useState();

  const [loading, setLoading] = useState(true);

  
  const user = useSelector(store => store.user);

  const getNotes = async() => {
     await getDocs(collection(db, "notes")).then((response) => {
      setNotes(response.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    })))
     })
  }

  useEffect(() => {
    getNotes()
  } ,[])

  return (
    <>
      {!loading && <Loader />}
      {loading && (
        <MainScreen
          title={`Welcome Back ${user?.displayName}...`}
          className="pt-[100px] container"
        >
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
                            <Link to="editnotes">
                              {" "}
                              <button className="text-white rounded bg-green-600 p-2 font-semibold">
                                Edit
                              </button>
                            </Link>
                            <button className="text-white rounded bg-red-600 p-2 font-semibold">
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
            <div className="absolute top-[50%] left-[40%] right-[40%] translate-[-50%,-50%]">
              <h3 className="text-[30px] font-semibold">No Notes Found !!</h3>
            </div>
          )}
        </MainScreen>
      )}
    </>
  );
}

export default MyNotes;
