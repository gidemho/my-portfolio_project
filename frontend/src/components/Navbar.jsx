import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai'; // Import close icon
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header>
            <nav className='bg-gray-800 text-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        <div className='flex-shrink-0'>
                            <GiHamburgerMenu
                                className={`text-3xl md:hidden cursor-pointer ${menuOpen ? 'hidden' : 'block'}`}
                                onClick={toggleMenu}
                            />
                            <AiOutlineClose
                                className={`text-3xl md:hidden cursor-pointer ${menuOpen ? 'block' : 'hidden'}`}
                                onClick={closeMenu}
                            />
                        </div>
                        <div className='flex'>
                            <div className='flex-shrink-0'>
                                <p className='text-lg text-green-400 font-bold'>Glory's Blog</p>
                            </div>
                            <div className='hidden md:block md:ml-10'>
                                <ul className='flex gap-4'>
                                    <li>
                                        <Link to='/' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/about' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/posts' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                            Posts
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='md:flex md:items-center'>
                            <div className='ml-4 flex-shrink-0'>
                                {loggedIn ? (
                                    <>
                                        <Link to='/profile' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => setLoggedIn(false)}
                                            className='ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium'
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to='/login' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                            Login
                                        </Link>
                                        <Link to='/register' className='ml-4 bg-green-400 hover:bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium'>
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden`}>
                    <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center'>
                        <Link to='/' className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
                            Home
                        </Link>
                        <Link to='/about' className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
                            About
                        </Link>
                        <Link to='/posts' className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
                            Posts
                        </Link>
                        <div className='flex flex-col text-center'>
                             <Link to='/login' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                            Login
                                        </Link>
                                        <Link to='/register' className='ml-4 bg-green-400 hover:bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium'>
                                            Sign Up
                                        </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
