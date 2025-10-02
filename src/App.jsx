import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";

const ProjectDetailModal = lazy(() => import("./pages/ProjectDetailModal.jsx"));

function AppRoutes() {
  const location = useLocation();
  const state =
    location.state && location.state.backgroundLocation
      ? { backgroundLocation: location.state.backgroundLocation }
      : {};

  return (
    <>
      <Routes location={state.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      {state.backgroundLocation && (
        <Routes>
          <Route
            path="/project/:slug"
            element={
              <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
                <ProjectDetailModal />
              </Suspense>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
