import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import Cookies from 'js-cookie'

const Employee = () => {
    const [employee,setEmployee]=useState([])
    const adminId =Cookies.get('id')
    useEffect(()=>{
        axios.get('http://localhost:3001/employee')
        .then(result=>{
            if(result.data.Status){
            setEmployee(result.data.Result)
            }else {
                alert(result.data.Error)
            }
        }).catch(err=>console.log(err))
    },[])
    const handleDelete=(id)=>{
        axios.delete('http://localhost:3001/delete_employee/'+id)
        .then(result=>{
            if(result.data.Status){
                window.location.reload()
            }else {
                alert(result.data.Error)
            }
        })
    }
    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            <Link to="/admin_dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
            <div className='mt-3'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee.map(e=>(
                            <tr>
                                <td>{e.Name}</td>
                                <td><img src={'http://localhost:3001/Images/'+e.Image} 
                                className='emp_img' alt="" /></td>
                                <td>{e.Email}</td>
                                <td>{e.Salary}</td>
                                <td>{e.Address}</td>
                                <td>{e.Phone}</td>
                                <td>
                                    <Link to={`/admin_dashboard/${adminId}/edit_employee/`+e.Id} className='btn btn-info btn-sm me-2'>Edit</Link>
                                    <button className='btn btn-warning btn-sm' onClick={()=>handleDelete(e.Id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    )

}

export default Employee