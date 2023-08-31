import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { DEFAULT_PROFILE } from "../../config/constants";

function Header() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [id, setId] = useState(null);

  const currentUser = auth.currentUser;

  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className=" shadow-gray-500 ">
      <nav className="bg-cyan-600 h-14 flex items-center p-10 justify-between fixed left-0 right-0 z-50">
        <h1 className="text-white text-2xl  font-bold">Notes Zipper</h1>
        <div className="flex space-x-12 items-center">
          {/* Large Screen */}
          <div className=" hidden sm:block ">
            <ul className="flex space-x-10 text-xl font-semibold text-white cursor-pointer items-center">
              {!user && (
                <Link to="/login">
                  <li>
                    <button className="text-cyan-600 px-4 pt-2 pb-2 rounded-3xl font-semibold bg-white -mr-6">
                      SignIn
                    </button>
                  </li>
                </Link>
              )}

              {!user && (
                <Link to="/register">
                  <li>
                    <button className="text-cyan-600 px-4 pt-2 pb-2 rounded-3xl font-semibold bg-white ">
                      SignUp
                    </button>
                  </li>
                </Link>
              )}
              {user && (
                <Link to="/mynotes">
                  <li className="focus:text-blue-300 hover:text-blue-300">
                    My Notes
                  </li>
                </Link>
              )}

              {user && (
                <div className="dropdown">
                  <button
                    className=" dropdown-toggle flex items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Avatar
                      alt="Profile_img"
                      src={!user.photoURL ? DEFAULT_PROFILE : user.photoURL}
                    />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" type="button">
                        {user?.displayName}
                      </button>
                    </li>
                    <Link to="account">
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
              )}
            </ul>
          </div>
          {/* {small Screen} */}

          <div className="dropdown sm:hidden block  ">
            <div className="flex space-x-4  items-center">
              <Link to="/mynotes">
                <div className="text-white font-semibold focus:text-blue-300 hover:text-blue-300">
                  My Notes
                </div>
              </Link>
              <div>
                <a
                  className=" text-white"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MenuIcon />
                </a>

                <ul className="dropdown-menu">
                  {/* <li>
               <Link to='mynotes'>
               <a className="dropdown-item" href="/">
                  My Notes
                </a>
               </Link>
              </li> */}

                  <li>
                    <Link to="profile">
                      <a className="dropdown-item" href="/">
                        Profile
                      </a>
                    </Link>
                  </li>

                  <li>
                    <a
                      className="dropdown-item"
                      href="/"
                      onClick={handleLogout}
                    >
                      LogOut
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
