import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosUtils";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user-list");

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/account/users/");
        setUsers(response);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    try {
      await axiosInstance.post("/account/logout/");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewUser = (id) => {
    navigate(`/users/${id}`); // Navigate to the user detail page
  };

  return (
    <div className="container">
      <h2 className="my-4">User List</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <button onClick={logout} className="btn btn-danger my-3">
        Logout
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewUser(user.id)} // Handle view button click
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
