import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const LogoutTime = () => {
    const [attendance,setAttendance]=useState([])
    axios.get('http://localhost:3001/logoutattendance')
      .then(result=>{
        if(result.data.Status){
         setAttendance(result.data.Result)
        }else {
          alert(result.data.Error)
        }
      }).catch(err=>console.log(err))
    return (
    <div className='px-5 mt-3 ' >
     <div className='d-flex justify-content-center '>
          <h3 >Logged out List</h3>
      </div>
      <div className='float-right'>
      <Link to="/admin_dashboard/chooselogout"><button>Find</button></Link>
      </div>
      <div className='mt-3 '>
        <table className='table'>
          <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Id</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
          </thead>
          <tbody>
            {
                attendance.map(a=>(
                   <tr>
                      <td>{a.Emp_Name}</td>
                      <td><img src={'http://localhost:3001/Images/'+a.Emp_Image} 
                          className='emp_img' alt="" /></td>
                      <td>{a.Emp_Id}</td>
                      <td>{a.Date}</td>
                      <td>{a.Time}</td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LogoutTime