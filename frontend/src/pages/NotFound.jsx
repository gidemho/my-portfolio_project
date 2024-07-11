import React from 'react'
import {Link} from "react-router-dom"
import { FaArrowAltCircleLeft } from 'react-icons/fa'
const NotFound = () => {
  return (
    <div className='flex justify-center my-10 text-center'>
        <div className='error'>
            <h1 className='text-9xl font-bold text-green-400'>404</h1>
            <p className='text-xl'>Oopsies! You tried to visit a page that didn't exist</p>
            <Link to="/" className='m-8 text-center'>
                <FaArrowAltCircleLeft className="text-5xl text-green-400"/>
            </Link>
        </div>
    </div>
  )
}

export default NotFound