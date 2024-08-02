import axios from 'axios';
import './style.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [user,setUser] = useState({
        Name:"",
        Email:"",
        Password:""
    });
    const navigate = useNavigate();

    const handleClick = async e=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:3001/users",user)
            .then(result=>{
                if(result.data.Status){
                    navigate("/userlogin")
                }else {
                    alert(result.data.Error)
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    const handleChange = (e) =>{
        setUser(prev=>({...prev,[e.target.name]: e.target.value}));
    };
    console.log(user);
  return (
    <div className='form'>
        <h2 className='log-in'>Signup</h2>
        <form >
            <div>
                <label htmlFor="name"><strong>Name:</strong></label><br></br>
                <input type="text" name='name' autoComplete='off' placeholder='Enter Name' 
                onChange={handleChange} className='form-ctrl rounded-0'></input>
            </div><br></br>
            <div>
                <label htmlFor="email"><strong>Email:</strong></label><br></br>
                <input type="email" name='email' autoComplete='off' placeholder='Enter Email' 
                onChange={handleChange} className='form-ctrl rounded-0'></input>
            </div><br></br>
            <div>
                <label htmlFor="password"><strong>Password:</strong></label><br></br>
                <input type="password" name='password' placeholder='Enter Password'
                onChange={handleChange} className='form-ctrl rounded-0'></input>
            </div><br></br>
        <button onClick={handleClick} className='upt'>Sign-up</button>
        <div className='mb-1'>
            <input type="checkbox" name='tick' id='tick' className='me-2'></input>
            <label htmlFor="password"><strong> I am agree with your terms & policies</strong></label>
        </div>
        </form>
    </div>
  );
};

export default Signup