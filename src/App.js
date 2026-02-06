// App.js
import { Routes, Route, Navigate } from "react-router-dom";
import Calculation from "./pages/Calculation";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/shared/ScroolTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Rute Publik: Login tidak pakai Layout */}
        <Route path="/login" element={<Login />} />

        {/* Rute Terproteksi: Harus login & pakai Layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/calculation" element={<Calculation />} />
                  <Route path="/report" element={<Report />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
