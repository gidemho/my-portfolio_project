import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username:'',
        cpassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        console.log('Form submitted with:', formData);
        
    };

    return (
        <div>
            <div className="container mx-auto mt-8">
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto shadow-md rounded px-8 pt-6 pb-8 bg-gray-800 mb-4">
                     <h1 className='text-5xl text-center font-bold'>Sign Up</h1>
                    <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-200 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline "
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-gray-200 text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline "
                            placeholder="Enter your username"
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
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline "
                            placeholder="Password"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="cpassword" className="block text-gray-200 text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="cpassword"
                            name="cpassword"
                            value={formData.cpassword}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline "
                            placeholder="Confirm password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                          Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
