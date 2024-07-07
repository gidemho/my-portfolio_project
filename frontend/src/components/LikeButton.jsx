import React, { useState, useEffect } from 'react';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import popSoundFile from '../assets/pop.mp3';

const LikeButton = ({ postId, userId }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${backendURL}/api/v1/posts/${postId}`);
                const post = await response.json();
                setLikes(post.likers.length);
                setLiked(post.likers.includes(userId));
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId, userId]);

    const likeAction = async () => {
        try {
            const response = await fetch(`${backendURL}/api/v1/posts/like/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: String(userId) }),
            });
            const updatedPost = await response.json();
            setLikes(updatedPost.likers.length);
            setLiked(!liked);
            const popSound = new Audio(popSoundFile);
            popSound.play();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <div className="container flex gap-4 items-center">
            <button className='like switch' onClick={likeAction}>
                {liked ? <AiFillLike className='text-lg text-red-600' /> : <AiOutlineLike className='text-md' />}
            </button>
            <p className='text-lg text-white'>{likes}</p>
        </div>
    );
};

export default LikeButton;
