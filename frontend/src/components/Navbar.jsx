import React, {useState} from 'react';
import { FaHamburger } from 'react-icons/fa';
import { Link } from "react-router-dom"
const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <header>
            <nav className='flex items-center justify-between p-4 bg-gray-800 text-white'>
                <div className="logo">
                    <p className="text-lg text-green-400 font-bold">Glory's Blog</p>
                </div>
                <ul className="flex gap-2">
                    <li className="ml-4">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="ml-4">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="ml-4">
                        <Link to="/posts">Posts</Link>
                    </li>
                </ul>
                <div>
                    <Link to="/login" className="mr-3">Login</Link>
                    <Link to="/register" className="btn bg-green-400 text-white">Sign Up</Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
