import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [adminTotal,setAdminTotal]=useState()
  const [employeeTotal,setEmployeeTotal]=useState()
  const [salaryTotal,setSalaryTotal]=useState()
  const [admins,setAdmins]=useState({
    id:'',
    email:'',
    password:'',
  })              
  useEffect(()=>{
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  },[])
  const adminRecords=()=>{
    axios.get('http://localhost:3001/admin_records')
    .then(result=>{
      if(result.data.Status){
        setAdmins({
          ...admins,
          id:result.data.Result[0].Id,
          email:result.data.Result[0].Email,
          password:result.data.Result[0].Password,
        })
      }else {
        alert(result.data.Error)
    }
    }).catch(err=>console.log(err))
  }
  const adminCount=()=>{
    axios.get('http://localhost:3001/admin_count')
    .then(result=>{
      if(result.data.Status){
        setAdminTotal(result.data.Result[0].admin)
      }else {
        alert(result.data.Error)
    }
    }).catch(err=>console.log(err))
  }
  const employeeCount=()=>{
    axios.get('http://localhost:3001/employee_count')
    .then(result=>{
      if(result.data.Status){
        setEmployeeTotal(result.data.Result[0].employee)
      }else {
        alert(result.data.Error)
    }
    }).catch(err=>console.log(err))
  }
  const salaryCount=()=>{
    axios.get('http://localhost:3001/salary_count')
    .then(result=>{
      if(result.data.Status){
        setSalaryTotal(result.data.Result[0].salary)
      }else {
        alert(result.data.Error)
    }
    }).catch(err=>console.log(err))
  }
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h5>Admin</h5>
          </div>
          <hr />
          <div className='d-flex justify-content-around'>
            <h5>Total: </h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-around'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-around'>
            <h5>Total:</h5>
            <h5>Rs {salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-4 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                <tr>
                  <td>{admins.email}</td>
                  <td>
                  <Link to={'/admin_dashboard/edit_admin/'+admins.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                  <button className='btn btn-warning btn-sm '>Delete</button>
                  </td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home