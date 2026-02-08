import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UsersPanel from "./components/Users/UsersPanel";
import RolesPanel from "./components/Roles/RolesPanel";
import PermissionsPanel from "./components/Permissions/PermissionsPanel";

const App = () => {
  const { user } = useAuth();
  const [showUsers, setShowUsers] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [showPermission, setShowPermission] = useState(false);

  if (!user) return <Login />;

  return (
    <div className="app-layout">
      <Navbar
        onOpenUser={() => setShowUsers(true)}
        onOpenRole={() => setShowRoles(true)}
        onOpenPermission={() => setShowPermission(true)}
      />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />

      {showUsers && <UsersPanel onClose={() => setShowUsers(false)} />}
      {showRoles && <RolesPanel onClose={() => setShowRoles(false)} />}
      {showPermission && (
        <PermissionsPanel onClose={() => setShowPermission(false)} />
      )}
    </div>
  );
};

export default App;