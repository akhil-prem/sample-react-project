import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosUtils";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { fetchProfile } = useProfile();

  useEffect(() => {
    console.log("login");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/account/login/", {
        email,
        password,
      });
      await fetchProfile();
      navigate("/users");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
