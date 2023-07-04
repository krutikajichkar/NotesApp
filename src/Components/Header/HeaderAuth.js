import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import supabase from "../../config/SupabaseClient";
//import { logOut } from "../../Firebase";
import { getuser } from "../../config/user";

function HeaderAuth() {
  const [id, setid] = useState(null);
  const user = getuser();

  const getUser = () => {
    user
      .then((response) => {
        setid(response.id);
        console.log(id, response.id);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
    } else {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
    getMedia(id);
  }, [id]);

  return (
    <div className=" shadow-gray-500 ">
      <nav className="bg-cyan-600 h-14 flex items-center p-10 justify-between fixed left-0 right-0 z-50">
        <h1 className="text-white text-2xl font-bold">Notes Zipper</h1>
        <div className="flex space-x-12 items-center">
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

          {/* {small Screen} */}
        </div>
      </nav>
    </div>
  );
}

export default HeaderAuth;
