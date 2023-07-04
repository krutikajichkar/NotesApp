import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import supabase from "../../config/SupabaseClient";
//import { logOut } from "../../Firebase";
import { getuser } from "../../config/user";
import Avatar from '@mui/material/Avatar';

const timestamp = new Date().getTime();
const CDN =
  "https://vipfgltyzdlvkveoojpr.supabase.co/storage/v1/object/public/avatars/";

function Header({show}) {
  const navigate = useNavigate();
  const user = getuser();
  const [id, setid] = useState(null)
  const [profile, setProfile] = useState()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      alert("Logged out Successfully");
       
      navigate("/");
    }
  };

  const getUser = () => {
    user.then((response) => {
       setid(response.id);
       console.log(id , response.id)
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

  const getMedia = async (id) => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .list(id + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data) {
      console.log(data);
      setProfile(data);
    } else {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
    getMedia(id);
  },[id])

  return (
    <div className=" shadow-gray-500 ">
      <nav className="bg-cyan-600 h-14 flex items-center p-10 justify-between fixed left-0 right-0 z-50">
        <h1 className="text-white text-2xl font-bold">Notes Zipper</h1>
        <div className="flex space-x-12 items-center">
         { !id && ( <div className="flex space-x-6">
            <Link to="register">
              <button className="text-cyan-600 px-4 pt-2 pb-2 rounded-3xl font-semibold bg-white ">
                SignUp
              </button>
            </Link>
            <Link to="login">
              <button className="text-cyan-600 px-4 pt-2 pb-2 rounded-3xl font-semibold bg-white ">
                Login
              </button>
            </Link>
          </div>)}
          
          {/* {id && (
            <div>
            <input
              className="rounded-3xl p-2 px-4 outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
          )} */}
          {/* Large Screen */}
          <div className=" hidden sm:block ">
           { id &&  <ul className="flex space-x-10 text-xl font-semibold text-white cursor-pointer items-center">
              <Link to="/mynotes">
                <li>My Notes</li>
              </Link>

              <div className="dropdown">
                <button
                  className=" dropdown-toggle flex items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Avatar alt="Profile_img" src={CDN + id + "/" + profile[0]?.name + "?timestamp=" + timestamp} />
                 
                </button>
                <ul className="dropdown-menu">
                  <Link to="profile">
                    <button className="dropdown-item" type="button">
                      My Profile
                    </button>
                  </Link>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </ul>}
          </div>
          {/* {small Screen} */}
          <div className="dropdown sm:hidden block ">
          { id &&  <a
              className=" text-white"
              href="/"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <MenuIcon />
            </a>}

          { id && <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="/">
                  My Notes
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/" onClick={handleLogout}>
                  LogOut
                </a>
              </li>
            </ul>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
