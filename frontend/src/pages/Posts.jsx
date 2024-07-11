import React, { useState, useEffect, useContext } from 'react'
import Postform from '../components/Postform'
import Searchbar from '../components/Searchbar'
import Post from '../components/Post'
import { FaPencil } from 'react-icons/fa6'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import AppContext from '../context/appProvider';
import axios from 'axios'

const Posts = () => {
  <ToastContainer />
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()
  const { loggedIn } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false)
  const [postDetails, setPostDetails] = useState([])
  const token = localStorage.getItem("sessionToken");
  const {userId} = JSON.parse(atob(token.split(".")[1]))
  useEffect(() => {
    const fetchPostData = async () => {
      if (!loggedIn) {
        navigate("/login")
        return
      }
      try {
       
        const postData = await axios.get(`${BACKEND_URL}/api/v1/allposts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(postData.data)
        setPostDetails(postData.data.posts)
      } catch (e) {
        console.error("Error fetching profile data:", e);
        toast.error(e.response?.data?.message || "Error occurred while fetching post data");
      }
    }
    fetchPostData()
  }, [])
  console.log(postDetails)
  return (
    <div className='relative'>
      <Searchbar />
      <Postform ghostMode={showForm} />
      <section className='flex flex-col gap-5'>
        <h1 className='text-4xl font-bold text-center'>Posts</h1>
       
        {postDetails.map(post => (
          <Post key={post._id}
            title={post.title}
            description={post.description}
            body={post.body}
            likes={post.likers.length}
            commentsCount={post.comments.length}
            userId={userId}
            postId={post._id}
            >
        
          </Post>
        ))}



      </section>
      <button onClick={() => { setShowForm(!showForm) }} className='rounded-full flex gap-2 fixed right-4 bottom-3 bg-green-400 p-5 text-center text-white'>
        <FaPencil className='text-2xl' />
        New Post
      </button>
    </div>
  )
}

export default Posts