import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">Go Home</Link>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">Click</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/">Item 1</Link></li>
              <li><Link to="/">Item 2</Link></li>
            </ul>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Navbar;