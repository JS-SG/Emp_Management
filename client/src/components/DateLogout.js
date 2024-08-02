import axios from 'axios'
import React, { useState } from 'react'


const DateLogout = () => {
    const [logout,setLogout]=useState([])
    const [dates,setDates]=useState({
        date:'',
      })
    const Find=()=>{
        axios.post('http://localhost:3001/findlogout_date',dates)
        .then(result=>{
          if(result.data.Status){
            console.log(result.data.Result)
           setLogout(result.data.Result)
           }else {
             alert(result.data.Error)
           }
         }).catch(err=>console.log(err))
      }
    return (
    <div className='px-5 mt-3 ' >
      <div className='d-flex justify-content-center '>
          <h3 >Logged out List</h3>
      </div>
      <div className='float-right'>
      <label htmlFor='Date'>Date</label><br />
      <input type='text' placeholder='yyyy-mm-dd' onChange={(e)=>setDates({...dates,date:e.target.value})}></input>
      <button onClick={Find}>Find</button>
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
                logout.map(l=>(
                   <tr>
                      <td>{l.Emp_Name}</td>
                      <td><img src={'http://localhost:3001/Images/'+l.Emp_Image} 
                          className='emp_img' alt="" /></td>
                      <td>{l.Emp_Id}</td>
                      <td>{l.Date}</td>
                      <td>{l.Time}</td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default DateLogout