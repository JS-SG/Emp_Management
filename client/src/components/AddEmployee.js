import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const AddEmployee = () => {
    const nav=useNavigate();
    const adminId=Cookies.get('id')
    const [employee,setEmployee]=useState({
        name:'',
        email:'',
        password:'',
        salary:'',
        address:'',
        phone:'',
        degree:'',
        dept:'',
        category_id:'',
        image:''
    })
    const [category,setCategory]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/category')
        .then(result=>{
            if(result.data.Status){
            setCategory(result.data.Result)
            setEmployee({
                ...employee,
                dept:result.data.Result[0].Name,
            })
            }else {
                alert(result.data.Error)
            }
        }).catch(err=>console.log(err))
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData=new FormData();
        formData.append('name',employee.name);
        formData.append('email',employee.email);
        formData.append('password',employee.password);
        formData.append('salary',employee.salary);
        formData.append('address',employee.address);
        formData.append('phone',employee.phone);
        formData.append('degree',employee.degree);
        formData.append('dept',employee.dept);
        formData.append('category_id',employee.category_id);
        formData.append('image',employee.image);
        axios.post('http://localhost:3001/add_employee',formData)
        .then(result=>{
            if(result.data.Status){
                nav(`/admin_dashboard/${adminId}/employee`)
            }else {
                alert(result.data.Error)
            }
        }
        )
        .catch(err=>console.log(err))
    }
    return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Add Employee</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label for="inputNmae" className='form-label'>
                            Name
                        </label><br></br>
                        <input type="text" className='form-ctrl rounded-0 w-100'
                            id="inputName" placeholder='Enter Name' 
                            onChange={(e)=>setEmployee({...employee,name: e.target.value})}>
                        </input>
                        </div>
                        <div className='col-12'>
                            <label for="inputEmail" className='form-label'>
                                Email
                            </label><br></br>
                            <input type='email' className='form-ctrl rounded-0 w-100'
                                id='inputEmail' placeholder='Enter Email' autoComplete='off'
                                onChange={(e)=>setEmployee({...employee,email: e.target.value})}>
                            </input>
                        </div>
                        <div className='col-12'>
                            <label for="inputPassword" className='form-label'>
                                Password
                            </label><br></br>
                            <input type='password' className='form-ctrl rounded-0 w-100'
                                id='inputPassword' placeholder='Enter Password'
                                onChange={(e)=>setEmployee({...employee,password: e.target.value})}>
                            </input>
                        </div>
                        <div className='col-12'>
                            <label for='inputSalary' className='form-label'>
                                Salary
                            </label><br></br>
                            <input type='text' className='form-ctrl rounded-0 w-100'
                                id='inputSalary' placeholder='Enter Salary' autoComplete='off'
                                onChange={(e)=>setEmployee({...employee,salary: e.target.value})}>
                            </input>
                        </div>
                        <div className='col-12'>
                            <label for='inputAddress' className='form-label'>
                                Address
                            </label><br></br>
                            <input type='text' className='form-ctrl rounded-0 w-100'
                                id='inputAddress' placeholder='Enter Address' autoComplete='off'
                                onChange={(e)=>setEmployee({...employee,address: e.target.value})}>
                            </input>
                        </div>
                        <div className='col-12'>
                            <label for='inputPhone' className='form-label'>
                                Phone
                            </label><br></br>
                            <input type='text' className='form-ctrl rounded-0 w-100'
                                id='inputPhone' placeholder='Enter Phone No' autoComplete='off'
                                onChange={(e)=>setEmployee({...employee,phone: e.target.value})}>
                            </input>
                        </div>
                        <div className='col-12'>
                            <label for='editdegree' className='form-label'>
                                Degree
                            </label><br></br>
                            <select name='editdegree' id='editdegree' className='form-select' placeholder='select'
                                onChange={(e) => setEmployee({ ...employee, degree: e.target.value })}>
                                <option >B.E</option>
                                <option >B.Tech</option>
                                <option >M.E</option>
                                <option >M.Tech</option>
                            </select>
                        </div>
                        <div className='col-12'>
                            <label for='category' className='form-label'>
                                Category
                            </label><br></br>
                            <select name='category' id='category' className='form-select'
                             onChange={(e)=>setEmployee({...employee,category_id: e.target.value})}>
                                {category.map(c =>{
                                    return <option value={c.Id}>{c.Name}</option>
                                })}
                            </select>
                        </div>
                        <div className='col-12 mb-3'>
                            <label className='form-label' form='inputGroupFile01'>
                                Select Image
                            </label><br></br>
                            <input type='file' className='form-ctrl rounded-0 w-100'
                                id='inputGroupFile01' name='image'
                                onChange={(e)=>setEmployee({...employee,image: e.target.files[0]})}>
                            </input>
                        </div>
                        <div className='col-12'>
                            <button type='submit' className='btn btn-primary w-100'>
                                Add Employee
                            </button>
                        </div>
                </form>
            </div>
        </div>
  )
}

export default AddEmployee