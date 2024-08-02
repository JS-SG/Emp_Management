import React from 'react'
import { Link } from 'react-router-dom'

const ChooseLogout = () => {
  return (
    <div>
    <div className='d-flex justify-content-center px-15 mt-3 h-20'>
          <h3>Logout Details</h3>
      </div>
    <div className='d-flex justify-content-center align-items-center vh-100 mb-15 '>
            <div className='p-3 rounded w-30 border'>
                <h2 className=''>Want the details</h2>
                    <div>
                        <label ><strong>By Date?</strong></label><br></br>
                        <Link to='/admin_dashboard/findlogout_date' >Date</Link>
                        </div><br></br>
                    <div>
                        <label ><strong>By Id?</strong></label><br></br>
                        <Link to='/admin_dashboard/findlogout_id' >Id</Link>
                    </div><br></br>
                    <div>
                        <label ><strong>By both?</strong></label><br></br>
                        <Link to='/admin_dashboard/findlogout' >Both</Link>
                    </div><br></br>
            </div>
        </div>
        </div>
  )
}

export default ChooseLogout