import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import ImageInspection from "./pages/ImageInspection";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inspection" element={<ImageInspection />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;