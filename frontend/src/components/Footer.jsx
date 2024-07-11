import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear() 
  return (
    <div className='m-5'>
        <p className='text-md text-center'>&copy; Copyright !null {currentYear}</p>
    </div>
  )
}

export default Footer