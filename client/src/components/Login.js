import React, { useState } from 'react'
import './style.css'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
    const [values,setValues]=useState({
        email:'',
        password:''
    })
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
    const [error,setError]=useState(null)
    const nav=useNavigate();
    axios.defaults.withCredentials=true;
    const handleSubmit=(event)=>{
        event.preventDefault()
        axios.post('http://localhost:3001/adminlogin',values)
        .then(result=>{
            if(result.data.loginStatus){
                const token = getCookie('token');
                const adminId = Cookies.get('id'); // Retrieve the adminId cookie
                console.log('Token:', token);
                console.log('Admin ID:', adminId);
                nav('/admin_dashboard/'+adminId)
            }else{
                setError(result.data.Error)
            }
        })
        .catch(err=>console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 login'>
            <div className='p-3 rounded w-30 border loginform'>
                <div className='text-warning'>
                    {error && error}
                </div>
                <h2 className='log-in'>Admin Login</h2>
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
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <div className='mb-1'>
                        <input type="checkbox" name='tick' id='tick' className='me-2'></input>
                        <label htmlFor="password"><strong> I am agree with your terms & policies</strong></label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login