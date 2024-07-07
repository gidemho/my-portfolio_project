import React, { useState } from 'react';
import { IoChatbox } from 'react-icons/io5';

const Comment = ({ postId, userId }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/comment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    }
  };

  return (
    <div className='comment-container'>
      <div className='comments flex gap-3' onClick={toggleCommentBox}>
        <IoChatbox className='text-2xl' /> Comments ({comments.length})
      </div>

      {showCommentBox && (
        <div className='comment-box container flex justify-center mt-4'>
          <form onSubmit={handleCommentSubmit} className='w-full'>
            <input
              className='w-4/5 h-24 rounded outline-none bg-slate-700 p-2'
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

      {comments.length > 0 && (
        <div className='comments-container mt-4'>
          {comments.map((comment) => (
            <div key={comment._id} className='comment'>
              <p>{comment.content}</p>
              {comment.author === userId && (
                <button className='delete-comment' onClick={() => handleDeleteComment(comment._id)}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
