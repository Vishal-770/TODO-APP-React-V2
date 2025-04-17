import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./Layout/AppLayout";
import Home from "./Pages/Home";
import TaskDashboard from "./Pages/TaskDashboard";
import CompletedTasksPage from "./Pages/CompletedTasksPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/tasks",
          element: <TaskDashboard />,
        },
        {
          path: "/completed",
          element: <CompletedTasksPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
