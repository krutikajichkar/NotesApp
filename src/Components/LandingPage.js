import React, { useEffect } from "react";
import notes_img from "./Images/notes_img.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../Redux/userSlice";
import { auth } from "../Firebase";

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, photoURL, displayName } = user;
        dispatch(
          addUser({
            email: email,
            displayName: displayName,
            uid: uid,
            photoURL: photoURL,
          })
        );

        navigate("/mynotes");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="relative text-center">
        <img
          src={notes_img}
          alt="notes_img"
          className="w-[100%]  h-[100vh] bg-cover"
        />
      </div>
    </>
  );
}

export default LandingPage;
