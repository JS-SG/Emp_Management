import React, { useState,useEffect } from 'react'
import './style.css'
import axios from 'axios' 
import { Link, useNavigate } from 'react-router-dom'


const UserLogin = () => {
    const [values,setValues]=useState({
        email:'',
        password:''
    })
    const dt=new Date()
    const date=dt.toISOString().split('T')[0];
    const time=dt.toTimeString().split(' ')[0];
    const [error,setError]=useState(null)
    const nav=useNavigate();
    axios.defaults.withCredentials=true;
    const handleSubmit=async function(event){
        event.preventDefault();
        try{
        const val1=await axios.post('http://localhost:3001/auth_employee',values)
        const name=val1.data.Result[0].Name
        const image=val1.data.Result[0].Image
        const eid=val1.data.Result[0].Id
        axios.post('http://localhost:3001/userlogin',values)
        .then(result=>{
            if(result.data.loginStatus){
                axios.post('http://localhost:3001/logout_attendance',
                    {name:val1.data.Result[0].Name,
                        image:val1.data.Result[0].Image,
                        eid:val1.data.Result[0].Id,
                        date:date,
                       }
                )
                axios.post('http://localhost:3001/login_attendance',
                    {name:val1.data.Result[0].Name,
                     image:val1.data.Result[0].Image,
                     eid:val1.data.Result[0].Id,
                     date:date,
                     time:time,
                    })
                    .then(result=>{
                        if(result.data.Status){
                            nav('/user_dashboard/'+val1.data.Result[0].Id)
                        }else {
                            alert(result.data.Error)
                        }
                        })
                        }else{
                            setError(result.data.Error)
                            console.log(error)
                        }
                        })
                    }
            catch(err){console.log(err)}        
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 login'>
            <div className='p-3 rounded w-30 border loginform'>
                <div className='text-warning'>
                    {error && error}
                </div>
                <h2 className='log-in'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email"><strong>Email:</strong></label><br></br>
                        <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                        onChange={(e)=>setValues({...values,email:e.target.value})} className='form-ctrl rounded-0'></input>
                        </div><br></br>
                    <div>
                        <label htmlFor="password"><strong>Password:</strong></label><br></br>
                        <input type="password" name='password' placeholder='Enter Password'
                        onChange={(e)=>setValues({...values,password:e.target.value})} className='form-ctrl rounded-0'></input>
                    </div><br></br>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button><br />
                    <p>Are you an admin?<Link to='/adminlogin'>Click here</Link></p>
                </form>
            </div>
        </div>
    )
}

export default UserLogin
