import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <main className='h-screen md:h-screen flex justify-center items-center'>
        <div className=''>
            <p className='text-3xl md:text-xl'>Are you in need of urgent attention?</p>
            <Link to={'/emergency'} className='bg-red-500 mt-7 p-3 h-52 w-52 rounded-full m-auto flex justify-center items-center  text-center  text-white text-4xl md:text-4xl hover:bg-red-700 transition duration-200 hover:duration-200'>
                Emergency
            </Link>
        </div>
    </main>

  )
}
export default Home