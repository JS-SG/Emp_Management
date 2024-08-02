import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Attendance = () => {
  return (
    <div>
    <div className='d-flex justify-content-center px-15 mt-3 h-20'>
          <h3>Attendance List</h3>
      </div>
    <div className='d-flex justify-content-center align-items-center vh-100 mb-15 '>
            <div className='p-3 rounded w-30 border'>
                <h2 className=''>Want to display</h2>
                    <div>
                        <label ><strong>Login?</strong></label><br></br>
                        <Link to='/admin_dashboard/logintime' >Login</Link>
                        </div><br></br>
                    <div>
                        <label ><strong>Logout?</strong></label><br></br>
                        <Link to='/admin_dashboard/logouttime' >Logout</Link>
                    </div><br></br>
            </div>
        </div>
        </div>
  )
}

export default Attendance