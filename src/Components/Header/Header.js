import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import supabase from "../../config/SupabaseClient";
//import { logOut } from "../../Firebase";

function Header() {
  const [user_id, setUser_id] = useState(null);
  const navigate = useNavigate();
  const [currUser, setcurrUser] = useState(null)


  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    }
    alert("Logged out Successfully");
   
    navigate("/");
    setcurrUser(null);
  };

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();

    const { user } = data;
    if (user) {
      setcurrUser(user);
      console.log(user);
      setUser_id(user.id)
    }
  };

  

  useEffect(() => {
    getUser();
  }, [user_id]);

  return (
    <div className=" shadow-gray-500 ">
      <nav className="bg-cyan-600 h-14 flex items-center p-10 justify-between fixed left-0 right-0 z-50">
        <h1 className="text-white text-2xl font-bold">Notes Zipper</h1>
        <div className="flex space-x-12 items-center">
          {!currUser && (
            <div className="flex space-x-6">
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
            </div>
          )}

          {currUser && <div>
            <input
              className="rounded-3xl p-2 px-4 outline-none"
              type="text"
              placeholder="Search"
            />
          </div>}
          {/* Large Screen */}
         { currUser && <div className=" hidden sm:block">
            <ul className="flex space-x-8 text-xl font-semibold text-white cursor-pointer">
              <Link to="/mynotes">
                <li>My Notes</li>
              </Link>

              <div className="dropdown">
                <button
                  className=" dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
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
            </ul>
          </div>}
          {/* {small Screen} */}

          <div className="dropdown sm:hidden block ">
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
