import "./App.css";

import Footer from './Components/Footer/Footer'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import MyNotes from "./Components/MyNotes";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login"
import Profile from "./Components/Profile";
import CreateNote from "./Components/CreateNote";
import EditNotes from "./Components/EditNotes";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <>
      <Router>
        
        <div >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/mynotes" element={<MyNotes />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mynotes/profile" element={<Profile />} />
            <Route path="/mynotes/createnote" element={<CreateNote/>}/>
            <Route path="/mynotes/editnotes" element={<EditNotes/>}/>
            <Route  path="*" element={<PageNotFound/>}/>
          </Routes>
        </div>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
