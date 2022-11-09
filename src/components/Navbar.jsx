import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='sticky top-0 shadow-md bg-white'>
        <nav className='flex justify-between items-center p-4 md:px-2 md:py-3'>
            <div className="logo">
                <h1>
                    <Link to={'/'} className=" md:text-xl text-red-500 text-4xl">
                        EmergeForYou
                    </Link>
                </h1>
            </div>
            <div className="nav-links">
                <ul className='flex gap-x-4 md:text-xs'>
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/emergency'}>Emergency</Link>
                    </li>
                    <li>
                        <Link to={'/about'}>About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Navbar