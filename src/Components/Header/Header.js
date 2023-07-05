import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import supabase from "../../config/SupabaseClient";
import Avatar from "@mui/material/Avatar";


const timestamp = new Date().getTime();
const CDN =
  "https://vipfgltyzdlvkveoojpr.supabase.co/storage/v1/object/public/avatars/";


function Header() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([])
  const [id, setId] = useState(null)
 

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      alert("Logged out Successfully");

      navigate("/");
    }
  };

  
const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error.message);
    return null;
  }
  return data?.user;
};

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
      setProfile(data)
      console.log(profile);
    } else {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        await getMedia(user.id);
        setId(user.id)
      }
      console.log(profile);
    };

    fetchUser();
    console.log(CDN + id + "/" + profile[0]?.name + "?timestamp=" + timestamp);
  }, [profile]);

  const imageUrl = CDN + id + "/" + profile[0]?.name + "?timestamp=" + timestamp;
  console.log(imageUrl)

  return (
    <div className=" shadow-gray-500 ">
      <nav className="bg-cyan-600 h-14 flex items-center p-10 justify-between fixed left-0 right-0 z-50">
        <h1 className="text-white text-2xl font-bold">Notes Zipper</h1>
        <div className="flex space-x-12 items-center">
          {/* Large Screen */}
          <div className=" hidden sm:block ">
            <ul className="flex space-x-10 text-xl font-semibold text-white cursor-pointer items-center">
              <Link
                to="/mynotes"
                className="focus:text-blue-300 hover:text-blue-300"
              >
                <li>My Notes</li>
              </Link>

              <div className="dropdown">
                <button
                  className=" dropdown-toggle flex items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                
                   {profile && profile[0] &&  <Avatar
                      alt="Profile_img"
                      src={
                        CDN + id + "/" + profile[0]?.name + "?timestamp=" + timestamp
                      }
                    />}
                  
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
          </div>
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
               <Link to='mynotes'>
               <a className="dropdown-item" href="/">
                  My Notes
                </a>
               </Link>
              </li>

              <li>
                <Link to="profile">
                  <a className="dropdown-item" href="/">
                    Profile
                  </a>
                </Link>
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
