import axios from 'axios'
import React, { useState } from 'react'

const FindLogout = () => {
    const [logout,setLogout]=useState([])
    const [data,setData]=useState({
        date:'',
        id:'',
      })
    const Find=()=>{
        axios.post('http://localhost:3001/findlogout',data)
        .then(result=>{
          if(result.data.Status){
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
      <div className='d-inline float-right'>
      <label htmlFor='number'>Id</label>
      <input type='number' placeholder='Enter Id' onChange={(e)=>setData({...data,id:e.target.value})}></input>
      </div>
      <div className='d-inline justify-content-end'>
      <label htmlFor='text'>Date</label>
      <input type='text' placeholder='yyyy-mm-dd' onChange={(e)=>setData({...data,date:e.target.value})}></input>
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

export default FindLogout