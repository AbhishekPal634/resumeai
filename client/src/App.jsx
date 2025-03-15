import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/user/dashboard", element: <UserDashboard /> },
    { path: "/user/profile", element: <Profile /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
