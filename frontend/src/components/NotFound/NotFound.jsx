import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='page notfound'>
       <div className='content'>
        <img src='/notfound.png' alt='Page Not Found'/>
          <Link to={'/'}>Return Home</Link>
       </div>
    </section>
  )
}

export default NotFound;