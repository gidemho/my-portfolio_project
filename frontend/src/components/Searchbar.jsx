import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showX, setShowX] = useState(false);

    const handleInputChange = (event) => {
        event.preventDefault()
        const value = event.target.value;
        setSearchQuery(value);
        setShowX(value.length > 0); 
    };

  
    const clearSearch = () => {
        setSearchQuery('');
        setShowX(false);
    };

    return (
        <div>
            <form className="relative m-6">
                <input
                    className="p-3 w-2/5 max-sm:w-full outline-none rounded"
                    type="text"
                    placeholder="Search blog posts"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <div className="absolute left-[36%] max-sm:left-3/4 top-2.5 flex gap-5">
                    <button><FaSearch className="text-2xl" /></button>
                    {showX && (
                        <button onClick={clearSearch}>
                            <IoClose className="text-2xl text-red-600" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Searchbar;
