import React, { useState } from 'react';

const Postform = ({ visibility }) => {
    const [formData, setFormData] = useState({
        'title': '',
        'description': '',
        'body': ''
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Posting content:', formData);


        setFormData('');
    };

    return (
        <div className={`flex my-5 justify-center ${visibility ? "block" : "hidden"}`}>

            <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full max-w-lg'>
                <h1 className='text-3xl text-center font-bold mb-4'>Create a new post</h1>
                <input type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='Post title' />
                <input type="text"
                    name="description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What's your post about? (description)" />
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
