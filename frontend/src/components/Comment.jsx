import React, { useState, useEffect } from 'react';
import { IoChatbox } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import CommentList from './CommentList'; // Make sure the path is correct

const Comment = ({ postId, userId }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem('sessionToken');

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/comment/post/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      } else {
        throw new Error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/comment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, content: comment }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setComment('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/comment/delete/${commentId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setComments(comments.filter(comment => comment._id !== commentId));
        toast.success('Deleted comment');
      } else {
        throw new Error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error("Couldn't delete comment");
    }
  };

  return (
    <div className='comment-container'>
      <div className='comments flex gap-3' onClick={toggleCommentBox}>
        <IoChatbox className='text-2xl' /> Comments ({comments.length})
      </div>
      {comments.length > 0 && (
        <CommentList
          comments={comments}
          userId={userId}
          token={token}
          handleDeleteComment={handleDeleteComment}
        />
      )}
      {showCommentBox && (
        <div className='comment-box container flex justify-center mt-4'>
          <form onSubmit={handleCommentSubmit} className='w-full'>
            <input
              className='w-4/5 h-12 rounded outline-none bg-slate-700 p-2'
              type='text'
              placeholder='Write a comment'
              value={comment}
              onChange={handleCommentChange}
            />
            <button type='submit' className='ml-2 bg-green-400 text-white p-2 rounded'>
              Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comment;
