import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { auth } from "./Firebase";

import MyNotes from "./Components/MyNotes";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile";
import CreateNote from "./Components/CreateNote";
import EditNotes from "./Components/EditNotes";
import PageNotFound from "./Components/PageNotFound";
import LandingPage from "./Components/LandingPage";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "./Redux/userSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
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
      <Header />
      <Outlet />
    </>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/mynotes/createnote",
        element: <CreateNote />,
      },
      {
        path: "/mynotes",
        element: <MyNotes />,
      },
      {
        path: "/editnotes",
        element: <EditNotes />,
      },
      {
        path: "/account",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default App;
