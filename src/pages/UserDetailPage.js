import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosUtils";

const UserDetailPage = () => {
  const { id } = useParams(); // Get the user ID from the URL params
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/account/users/${id}/`);
        setUser(response); // Adjust depending on your API response structure
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>User Details</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {/* You can add more details as needed */}
    </div>
  );
};

export default UserDetailPage;
