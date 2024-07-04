import React from 'react'
import { FaRegThumbsUp } from 'react-icons/fa'
import { IoChatbox } from 'react-icons/io5'

const Post = ({title, description, body, commentsCount}) => {
  return (
    <div className='container flex justify-center'>
      <div className="post-container card w-4/5 bg-gray-800 p-5 text-center">
        <h1 className='text-3xl font-bold'>{title}</h1>
        <h3 className="text-2xl font-light">{description}</h3>
        <p className='text-md'>{body}</p>

        <div className="reactions flex gap-5 m-5">
        <div className="comments flex gap-3">
          <FaRegThumbsUp className='text-2xl'/> {commentsCount}
         </div>
         <div className="comments flex gap-3">
          <IoChatbox className='text-2xl'/> {commentsCount}
         </div>
        </div>
      </div>
    </div>
  )
}

export default Post