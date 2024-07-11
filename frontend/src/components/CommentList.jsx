import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const CommentList = ({ comments, userId, token, handleDeleteComment }) =>{
  return (
    <div className='comments-container mt-4 text-left'>
    
      {comments.map((comment) => (
        <div key={comment._id} className='comment flex justify-between'>
          <p key={comment._id} className='text-red-500'>{comment.username}</p>
          <p key={comment._id}>{comment.content}</p>
          {comment.author === userId && (
            <button key={comment._id} className='delete-comment' onClick={() => handleDeleteComment(comment._id)}>
              <FaTrash className='text-red-600 text-md' />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
