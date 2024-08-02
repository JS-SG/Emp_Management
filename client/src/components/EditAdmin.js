import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const EditAdmin = () => {
    const {id}=useParams()
    const nav = useNavigate()
    const [pass,setPass]=useState({
        password:'',
    })
    const [admin, setAdmin] = useState({
        email: '',
        password:'',
        new_password:''
    });
    useEffect(() => {
        axios.get('http://localhost:3001/admin/'+id)
            .then(result => {
                setAdmin({
                    ...admin,
                    email: result.data.Result[0].Email,
                })
                setPass({
                    ...pass,
                    password: result.data.Result[0].Password,
                })
            }).catch(err => console.log(err))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/edit_admin/'+id, admin)
            .then(result => {
                if (result.data.Status) {
                    nav('/admin_dashboard')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Edit Admin</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label for="inputEmail" className='form-label'>
                            Email
                        </label><br></br>
                        <input type='email' className='form-ctrl rounded-0 w-100' 
                            id='inputEmail' placeholder='Enter Email'value={admin.email} autoComplete='off'
                            onChange={(a) => setAdmin({ ...admin, email: a.target.value })}>
                        </input>
                    </div>
                    <div className='col-12'>
                        <label for="oldPassword" className='form-label'>
                            Password
                        </label><br></br>
                        <input type='password' className='form-ctrl rounded-0 w-100'
                            id='oldPassword' placeholder='Enter Old Password' autoComplete='off'
                            onChange={(a) => setAdmin({ ...admin, password: a.target.value })}>
                        </input>
                    </div>
                    <div className='col-12'>
                        <label for="newPassword" className='form-label'>
                            New Password
                        </label><br></br>
                        <input type='password' className='form-ctrl rounded-0 w-100' 
                            id='newPassword' placeholder='Enter New Password' autoComplete='off'
                            onChange={(a) => setAdmin({ ...admin, new_password: a.target.value })}>
                        </input>
                    </div>
                   
                    <div className='col-12'>
                        <button type='submit' className='btn btn-primary w-100'>
                            Edit Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default EditAdmin