import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Profile = () => {
    const {id}=useParams()
    const loc ="/user_dashboard/"+id+"/edit_profile"
    const nav = useNavigate()
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/profile/'+id)
            .then(result => {
                setProfile()
            }).catch(err => console.log(err))
    }, [])
    return (
        <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Employee List</h3>
        </div>
        <Link to={loc} className='btn btn-success'>Profile</Link>
        <div className='mt-3'>
        <table className='table'>
            <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                    <tr>
                        <th>Image</th>
                    </tr>
                    <tr>
                        <th>Id</th>
                    </tr>
                    <tr>
                        <th>Email</th>
                    </tr>
                    <tr>
                        <th>Address</th>
                    </tr>
                    <tr>
                        <th>Phone</th>
                    </tr>
                    <tr>
                        <th>Degree</th>
                    </tr>
                    <tr>
                        <th>Department</th>
                    </tr>
                    <tr>
                        <th>Salary</th>
                    </tr>
            </thead>
            <tbody>
                {
                    profile.map(p=>(
                        <tr>
                        <td>{p.Name}</td>
                        <td><img src={'http://localhost:3001/Images/'+p.Image} 
                            className='emp_img' alt="" /></td>
                        <td>{p.Email}</td>
                        <td>{p.Salary}</td>
                        <td>{p.Address}</td>
                        <td>
                            <Link to={loc} className='btn btn-info btn-sm me-2'>Edit</Link>
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

export default Profile