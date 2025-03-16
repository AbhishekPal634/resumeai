import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ResumeEditor from "./pages/ResumeEditor";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/user/dashboard", element: <UserDashboard /> },
    { path: "/user/profile", element: <Profile /> },
    { path: "/user/settings", element: <Settings /> },
    { path: "/resume/edit/:id", element: <ResumeEditor /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
