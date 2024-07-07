import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from '../context/appProvider';

const Postform = ({ ghostMode }) => {
    const { loggedIn } = useContext(AppContext);
    const navigate = useNavigate();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
   
    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, [loggedIn, navigate]);

    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        body: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          
            const response = await axios.post(`${backendURL}/api/v1/user/post`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.sessionToken}`
                }
            });

            if (response.status === 201) {
                toast.success("Post created successfully");
                setFormData({
                    title: '',
                    description: '',
                    body: ''
                });
            }
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Error occurred while creating the post");
        }
    };

    return (
        <div className={`flex my-5 justify-center ${ghostMode ? "block" : "hidden"}`}>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full max-w-lg'>
                <h1 className='text-3xl text-center font-bold mb-4'>Create a new post</h1>
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='Post title'
                />
                <input
                    type="text"
                    name="description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What's your post about? (description)"
                />
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    placeholder="What's on your mind?"
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    rows="4"
                ></textarea>
                <button type="submit" className='btn bg-green-400 text-white mt-4'>Post</button>
            </form>
        </div>
    );
};

export default Postform;
