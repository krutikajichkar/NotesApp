import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import MyNotes from "./Components/MyNotes";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile";
import CreateNote from "./Components/CreateNote";
import EditNotes from "./Components/EditNotes";
import PageNotFound from "./Components/PageNotFound";

function App() {
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
        path: "/createnote",
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
        path: "login",
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
