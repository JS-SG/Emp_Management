import React from 'react'
import { Link,Outlet, useNavigate, useParams } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css"
import axios from 'axios'

const UserDashboard = () => {
    const {id}=useParams()
    const dt=new Date()
    const loc="/user_dashboard/"+id+"/profile" 
    const date=dt.toISOString().split('T')[0];
    const time=dt.toTimeString().split(' ')[0];
    const nav = useNavigate()
    axios.defaults.withCredentials=true
    const handleLogout=async function(){
        try{
        axios.put('http://localhost:3001/logout/'+id,
            {
                date:date,
                time:time
        })
        .then(result=>{
            if(result.data.Status){
                nav('/userlogin')
            }
        }).catch(err=>console.log(err))
    }
    catch(err){
        console.log(err)
    }
}
    return (
    <div className='container-fluid'>
        <div className='row flex-nowrap'>
            <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
                <div className='d-flex flex-column align-items-center align-items-sm-start px-10 pt-2 text-white min-vh-100'>
                    <Link to="/user_dashboard" 
                    className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
                        <span className='fs-5 fw-bolder d-none d-sm-inline ms-5'>Rishon</span></Link>
                    <ul 
                    className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'>
                        <li className='w-100'><Link to="/user_dashboard/:id" className='nav-link text-white px-0 align-middle'>
                        <i className='fs-4 bi-speedometer2 ms-2'></i>
                        <span className='ms-2 d-none d-sm-inline'>Dashboard</span></Link></li>
                        <li className='w-100'><Link to={loc} className='nav-link px-0 align-middle text-white'>
                        <i className='fs-4 bi-person ms-2'></i>
                        <span className='ms-2 d-none d-sm-inline'>Profile</span></Link></li>
                        <li className='w-100'><Link to="/user_dashboard/suggestion"className='nav-link px-0 align-middle text-white'>
                        <i className='fs-4 bi-question ms-2'></i>
                        <span className='ms-2 d-none d-sm-inline'>Suggestion</span></Link></li>
                        <li className='w-100' onClick={handleLogout}><Link className='nav-link px-0 align-middle text-white'>
                        <i className='fs-4 bi-power ms-2'></i>
                        <span className='ms-2 d-none d-sm-inline' onClick={handleLogout}>Logout</span></Link></li>
                    </ul>
                </div>
            </div>
            <div className='col p-0 m-0'>
                <div className='p-2 d-flex justify-content-center shadow'>
                    <h4>Employee Dashboard</h4>
                </div>
                <Outlet></Outlet>
            </div>
        </div>
    </div>
  )
}

export default UserDashboard