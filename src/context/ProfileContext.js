import { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../constants/config";

// Create a Context for Profile
const ProfileContext = createContext();

// Create a Provider component
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await fetch(API_URL + "/account/profile/", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(); // Call on initial mount
  }, []); // Only runs once

  // Expose fetchProfile so it can be triggered after login
  return (
    <ProfileContext.Provider value={{ profile, loading, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use the ProfileContext
export const useProfile = () => useContext(ProfileContext);
