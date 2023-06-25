import React  from "react";
import MainScreen from "./MainScreen";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";


function MyNotes() {

  
  return (
    <MainScreen
      title="Welcome Back Krutika Jichkar..."
      className="pt-[100px] container"
    >
      <Link to="createnote">
        <button className="bg-cyan-600 text-white p-2 mb-4 rounded font-semibold hover:bg-cyan-800 shadow-slate-900 ">
          Create New Note
        </button>
      </Link>

     <div className=" pb-2">
        <Accordion >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header "
          >
            <div className="card w-[100%] ">
              <div className="flex justify-between card-header items-center ">
                <div>title</div>
                <div className="flex space-x-2 ">
                  <button className="text-white rounded bg-green-600 p-2 font-semibold">
                    Edit
                  </button>
                  <button className="text-white rounded bg-red-600 p-2 font-semibold">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="card-body">
              <h4 className="badge text-bg-success"> Category </h4>
              <blockquote className="blockquote mb-0">
                <p>content</p>
                <footer className="blockquote-footer pt-4">
                  Created on some date
                  {/* <cite title="Source Title">Source Title</cite> */}
                </footer>
              </blockquote>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </MainScreen>
  );
}

export default MyNotes;
