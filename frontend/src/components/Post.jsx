import React from 'react';
import { IoChatbox } from 'react-icons/io5';
import LikeButton from '../components/LikeButton';
import Comment from '../components/Comment'; // Import the Comment component

const Post = ({ title, description, body, likes, commentsCount, userId, postId }) => {
  return (
    <div className='container flex justify-center'>
      <div className='post-container card w-4/5 bg-gray-800 p-5 text-center'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <h3 className='text-2xl font-light'>{description}</h3>
        <p className='text-md'>{body}</p>

        <div className='reactions flex gap-5 m-5'>
          <LikeButton initialLikes={likes} userId={userId} postId={postId} />
          <Comment postId={postId} userId={userId} /> {/* Render Comment component */}
        </div>
      </div>
    </div>
  );
};

export default Post;
