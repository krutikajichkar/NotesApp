import React ,{useState,useEffect} from "react";
import MainScreen from "./MainScreen";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import supabase from "../config/SupabaseClient";



function MyNotes() {

  // const [title, setTitle] = useState();
  // const [content, setContent] = useState();
  // const [category, setCategory] = useState();
  
  const [notes, setNotes] = useState([]);
  const [fetcherror, setFetcherror] = useState();
  const [clicked, setClicked] = useState(false);
  const [userName, setuserName] = useState('')
  const [user_id, setuser_id] = useState(null)
  

  const fetchData = async (user_id) => {
    let { data  , error} = await supabase
    .from('notes')
    .select('*')
    .eq('userID' , user_id)

    if(error){
      setFetcherror(error);
      setNotes(null);
    }

    if(data){
      
      setNotes(data);
     
      setFetcherror(null);
    }

    //console.log(data)
  }

  const deleteHandler = async(id) => {
  const { error} = await supabase
  .from('notes')
  .delete()
  .eq('id',id)

  setClicked(true);
  console.log("deletee is clicked with id ",id)
  console.log(error)
  }

  const editHandler = (id) => {
    localStorage.setItem('editId',id);
  }

  const getUser = async() => {
    const { data } = await supabase.auth.getUser();

    const { user } = data;
    const {user_metadata , id} = user;

    if (user_metadata) {
      setuserName(user_metadata.full_name)
      console.log(user_metadata);
    }

    if(id){
      setuser_id(id);
    }
   
  }

  useEffect (() => {
    fetchData(user_id);
    getUser();
  },[clicked,user_id])

  return (
   <>
    <MainScreen
      title= {`Welcome Back ${userName}...`}
      className="pt-[100px] container"
    >
      <Link to="createnote">
        <button className="bg-cyan-600 text-white p-2 mb-4 rounded font-semibold hover:bg-cyan-800 shadow-slate-900 ">
          Create New Note
        </button>
      </Link>

     <div className=" pb-2">
       {/* {fetcherror && (<p>{fetcherror}</p>)} */}
       {notes && (
        notes.map((ele) => {
          return(
            <Accordion key={ele.id} >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header "
            >
              <div className="card w-[100%] ">
                <div className="flex justify-between card-header items-center ">
                  <div>{ele.title}</div>
                  <div className="flex space-x-2 ">
                   <Link to='editnotes'> <button className="text-white rounded bg-green-600 p-2 font-semibold" onClick={() => editHandler(ele.id)}>
                      Edit
                    </button></Link>
                    <button className="text-white rounded bg-red-600 p-2 font-semibold" onClick={() => deleteHandler(ele.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="card-body">
                <h4 className="badge text-bg-success"> {ele.category} </h4>
                <blockquote className="blockquote mb-0">
                  <p>{ele.content}</p>
                  <footer className="blockquote-footer pt-4">
                    Created on {new Date(ele.created_at).toDateString()}
                    {/* <cite title="Source Title">Source Title</cite> */}
                  </footer>
                </blockquote>
              </div>
            </AccordionDetails>
          </Accordion>
          )
        })

       )}
      </div>
    </MainScreen>
   </>
  );
}

export default MyNotes;
