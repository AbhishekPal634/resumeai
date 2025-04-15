import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ResumeEditor from "./pages/ResumeEditor";
import TemplateSelector from "./pages/TemplateSelector";
import JobMatch from "./pages/JobMatch";
import AuthCallback from "./pages/AuthCallback";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/auth/callback", element: <AuthCallback /> },
    { path: "/user/dashboard", element: <UserDashboard /> },
    { path: "/user/profile", element: <Profile /> },
    { path: "/user/settings", element: <Settings /> },
    { path: "/resume/new", element: <ResumeEditor /> },
    { path: "/resume/edit/:id", element: <ResumeEditor /> },
    { path: "/resume/templates", element: <TemplateSelector /> },
    { path: "/resume/jobmatch", element: <JobMatch /> },
  ]);
  return (
    // Wrap RouterProvider with AuthProvider
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
