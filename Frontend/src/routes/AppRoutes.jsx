import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import Dashboard from "../components/ProjectsPage/Dashboard";
import CreateProject from "../pages/ProjectPage";
import { ProjectDetails } from "../components/ProjectsPage/ProjectDetails";
import ProtectedRoute from "./ProtectRoutes";
import Home from "../pages/LandingPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/create"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
