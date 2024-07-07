import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from '../context/appProvider';
const Login = () => {
    const { setLoggedIn } = useContext(AppContext)
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    };

    useEffect(() => {
        const submitForm = async () => {
            try {
                const response = await axios.post(`${backendURL}/api/v1/auth/login`, formData);
                setResponseMessage(response.data.message);
                const { token } = response.data
                const { profpic } = JSON.parse(atob(token.split(".")[1]))

                localStorage.setItem("sessionToken", token)
                if (response.status === 200) {
                    toast.success("Logged in successfully!");
                    setLoggedIn(true)
                }
            } catch (error) {
                const status = error.response?.status;
                const message = error.response?.data?.message || "Error occurred while submitting form";

                setResponseMessage(message);

                if (status === 400) {
                    toast.error(message || "Invalid credentials");
                } else if (status === 500) {
                    toast.error(message || "Server error occurred");
                } else {
                    toast.error("Unexpected error occurred");
                    console.log(error)
                }
            } finally {
                setIsSubmitting(false);
            }
        };

        if (isSubmitting) {
            submitForm();
        }
    }, [isSubmitting, formData, backendURL]);

    return (
        <div>
            <ToastContainer />
            <div className="container mx-auto mt-8">
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto shadow-md rounded px-8 pt-6 pb-8 bg-gray-800 mb-4">
                    <h1 className='text-5xl text-center font-bold'>Log In</h1>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-200 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Spinner /> : 'Log In'}
                        </button>
                    </div>
                </form>
                {responseMessage && <p className="text-center text-white mt-4">{responseMessage}</p>}
            </div>
        </div>
    );
};

export default Login;
