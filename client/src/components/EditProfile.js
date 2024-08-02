import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditProfile = () => {
    const { id } = useParams()
    const nav = useNavigate()
    const loc ="/user_dashboard/"+id+"/profile"
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        address: '',
        password:'',
        phone:'',
        degree:'',
        dept:'',
        image:''
    });
    useEffect(() => {
        axios.get('http://localhost:3001/employee/'+id)
            .then(result => {
                setProfile({
                    ...profile,
                    name: result.data.Result[0].Name,
                    email: result.data.Result[0].Email,
                    address: result.data.Result[0].Address,
                    password: result.data.Result[0].Password,
                    image: result.data.Result[0].Image,
                })
            }).catch(err => console.log(err))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData=new FormData();
        formData.append('name',profile.name);
        formData.append('email',profile.email);
        formData.append('password',profile.password);
        formData.append('address',profile.address);
        formData.append('phone',profile.phone);
        formData.append('dept',profile.dept);
        formData.append('dept',profile.dept);
        formData.append('image',profile.image);
        axios.put('http://localhost:3001/edit_profile/'+id, formData)
            .then(result => {
                if (result.data.Status) {
                    nav(loc)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
        }
    return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rounded w-50 border'>
        <h3 className='text-center'>Edit Profile</h3>
        <form className='row g-1' onSubmit={handleSubmit}>
            <div className='col-12'>
                <label for="inputName" className='form-label'>
                    Name
                </label><br></br>
                <input type="text" className='form-ctrl rounded-0 w-100'
                    id="inputName" placeholder='Enter Name' value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}>
                </input>
            </div>
            <div className='col-12'>
                <label for="inputEmail" className='form-label'>
                    Email
                </label><br></br>
                <input type='email' className='form-ctrl rounded-0 w-100' value={profile.email}
                    id='inputEmail' placeholder='Enter Email' autoComplete='off'
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}>
                </input>
            </div>
            <div className='col-12'>
                <label for='inputPassword' className='form-label'>
                    Password
                </label><br></br>
                <input type='password' className='form-ctrl rounded-0 w-100' value={profile.password}
                    id='inputPassword' placeholder='Enter Password' autoComplete='off'
                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}>
                </input>
            </div>
            <div className='col-12'>
                <label for='inputAddress' className='form-label'>
                    Address
                </label><br></br>
                <input type='text' className='form-ctrl rounded-0 w-100' value={profile.address}
                    id='inputAddress' placeholder='Enter Address' autoComplete='off'
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}>
                </input>
            </div>
            <div className='col-12'>
                <label for='inputPhone' className='form-label'>
                    Phone
                </label><br></br>
                <input type='text' className='form-ctrl rounded-0 w-100'
                    id='inputPhone' placeholder='Enter Phone No' autoComplete='off'
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}>
                </input>
            </div>
            <div className='col-12'>
                <label for='editdegree' className='form-label'>
                    Degree
                </label><br></br>
                <select name='editdegree' id='editdegree' className='form-select' placeholder='select'
                    onChange={(e) => setProfile({ ...profile, degree: e.target.value })}>
                         <option >B.E</option>
                         <option >B.Tech</option>
                         <option >M.E</option>
                         <option >M.Tech</option>
                </select>
            </div>
            <div className='col-12'>
                <label for='editdept' className='form-label'>
                    Department
                </label><br></br>
                <select name='editdept' id='editdept' className='form-select' placeholder='select'
                    onChange={(e) => setProfile({ ...profile, dept: e.target.value })}>
                         <option >CSE</option>
                         <option >ADS</option>
                         <option >IT</option>
                         <option >ECE</option>
                </select>
            </div>
            <div className='col-12 mb-3'>
                <label className='form-label' form='inputGroupFile01'>
                    Select Image
                </label><br></br>
                <input type='file' className='form-ctrl rounded-0 w-100'
                    id='inputGroupFile01' name='image' value={profile.image}
                    onChange={(e)=>setProfile({...profile,image: e.target.files[0]})}>
                </input>
            </div>
            <div className='col-12'>
                <button type='submit' className='btn btn-primary w-100'>
                    Edit Profile
                </button>
            </div>
        </form>
    </div>
</div>
  )
}

export default EditProfile