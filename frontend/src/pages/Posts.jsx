import React, { useState } from 'react'
import Postform from '../components/Postform'
import Searchbar from '../components/Searchbar'
import Post from '../components/Post'
import { FaPencil } from 'react-icons/fa6'
const Posts = () => {
  const [showForm, setShowForm] = useState(false)
  return (
    <div className='relative'>
      <Searchbar />
      <Postform visibility={showForm} />
      <section className='flex flex-col gap-5'>
        <h1 className='text-4xl font-bold text-center'>Posts</h1>
        <Post title="The Tale of Hachishaku-sama" description="Japanese Urban lore" body="ddduuuuuuuuuuuuuuuuuuuuuuuuuuu\n" commentsCount={2}></Post>
        <Post title="The Tale of Jason the Argonaut" description="Mr. Nobody" body="ddduuuuuuuuuuuuuuuuuuuuuuuuuuu\n" commentsCount={2}></Post>
        <Post title="Origin of Ubuntu" description="The story of the best OS" body="ddduuuuuuuuuuuuuuuuuuuuuuuuuuu\n" commentsCount={2}></Post>
        <Post title="Analysis of the Monster series" description="Pretty dark stories to be reading to kids no?" body="ddduuuuuuuuuuuuuuuuuuuuuuuuuuu\n" commentsCount={2}></Post>
        <Post title="The Tale of Hachishaku-sama" description="She is a Japanese goddess" body="ddduuuuuuuuuuuuuuuuuuuuuuuuuuu\n" commentsCount={2}></Post>
        <Post title="The Tale of Hachishaku-sama" description="She is a Japanese goddess" body="ddduuuuuuuuuuuuuuuuuuuuuuuuuuu\n" commentsCount={2}></Post>
        <Post title="The Tale of Hachishaku-sama" description="She is a Japanese goddess" body="ddduuuuuuuuuuuuuuuuuuuuuuuuuuu\n" commentsCount={2}></Post>
        <Post title="The Tale of Hachishaku-sama" description="She is a Japanese goddess" body="ddduuuuuuuuuuuuuuuuuuuuuuuuuuu\n" commentsCount={2}></Post>
        <Post title="The Tale of Hachishaku-sama" description="She is a Japanese goddess" body="ddduuuuuuuuuuuuuuuuuuuuuuuuuuu\n" commentsCount={2}></Post>
        <Post title="The Tale of Hachishaku-sama" description="She is a Japanese goddess" body="ddduuuuuuuuuuuuuuuuuuuuuuuuuuu\n" commentsCount={2}></Post>

      </section>
      <button onClick={() => { setShowForm(!showForm) }} className='rounded-full flex gap-2 fixed right-4 bottom-3 bg-green-400 p-5 text-center text-white'>
        <FaPencil className='text-2xl' />
        New Post
      </button>
    </div>
  )
}

export default Posts