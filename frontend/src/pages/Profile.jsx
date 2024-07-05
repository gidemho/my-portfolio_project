import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import AppContext from '../context/appProvider';

const Profile = () => {
  const { loggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [profileData, setProfileData] = useState({
    email: '',
    username: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [profpic, setProfpic] = useState(null);

  console.log("Logged In:", loggedIn);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!loggedIn) {
        navigate("/login");
        return;
      }

      try {
        const token = localStorage.getItem("sessionToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const { userId, profpic: profilePicture } = JSON.parse(atob(token.split(".")[1]));
        setProfpic(profilePicture);

        console.log("Fetching profile data for user ID:", userId);
        console.log(`${backendURL}/api/v1/user/profile/${userId}`);

        const response = await axios.get(`${backendURL}/api/v1/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Profile data fetched:", response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error(error.response?.data?.message || "Error occurred while fetching profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [loggedIn, navigate, backendURL]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <ToastContainer />
      <div className="container mx-auto mt-8">
        <div className="max-w-sm mx-auto shadow-md rounded px-8 pt-6 pb-8 bg-gray-800 mb-4">
          <h1 className="text-5xl text-center font-bold">Profile</h1>
          <div className="mt-4 flex flex-col justify-center ">
            {profpic && <img className="rounded-full my-3" src={profpic} alt="Profile avatar" />}
            <p className="text-gray-200 text-lg"><strong>Email:</strong> {profileData.email}</p>
            <p className="text-gray-200 text-lg"><strong>Username:</strong> {profileData.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
