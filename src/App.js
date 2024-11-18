import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserListPage from "./pages/UserListPage";
import { ProfileProvider } from "./context/ProfileContext";
import NotFound from "./pages/NotFound";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import UserDetailPage from "./pages/UserDetailPage";

function App() {
  console.log("app");

  return (
    <ProfileProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
