import React, { useState, useEffect } from "react";
import MainScreen from "./MainScreen";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import supabase from "../config/SupabaseClient";
import Header from "./Header/Header";
import Loader from "./Loader";
import Error from "./popups/Error";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [fetcherror, setFetcherror] = useState();
  const [userName, setuserName] = useState("");
  const [user_id, setuser_id] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (user_id) => {
    let { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("userID", user_id);

    if (error) {
      setFetcherror(error.message);
      setNotes(null);
    } else {
      setNotes(data);
      setLoading(false);
      setFetcherror(null);
    }

    //console.log(data)
  };

  return (
    <>
      {!loading && <Loader />}
      {loading && (
        <MainScreen
          title={`Welcome Back ${userName}...`}
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
                          <ReactMarkdown className="mt-4">
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
