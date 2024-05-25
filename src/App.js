import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import LoginForm from "./components/form/loginForm";
import RegisterForm from "./components/form/registerForm";
import CreatePost from "./components/form/createPots";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatePost from "./components/form/updatePost";
import { MyFlats } from "./components/home/myFlats";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/login",
          element: <LoginForm />,
        },
        {
          path: "/register",
          element: <RegisterForm />,
        },
        {
          path: "/createpost",
          element: <CreatePost />,
        },
        {
          path: "/updatepost/:postid",
          element: <UpdatePost />,
        },
        { path: "/myflats", element: <MyFlats /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
