import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'

const EditEmployee = () => {
    const { id } = useParams()
    const nav = useNavigate()
    const adminId=Cookies.get('id')
    const [category, setCategory] = useState([])
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        salary: '',
        address: '',
        phone:'',
        category_id:'',
        image:'',
    });
    useEffect(() => {
        axios.get('http://localhost:3001/category')
            .then(result => {
                setCategory(result.data.Result)
            }).catch(err => console.log(err))

        axios.get('http://localhost:3001/employee/'+id)
            .then(result => {
                setEmployee({
                    ...employee,
                    name: result.data.Result[0].Name,
                    email: result.data.Result[0].Email,
                    salary: result.data.Result[0].Salary,
                    address: result.data.Result[0].Address,
                    phone: result.data.Result[0].Phone,
                })
            }).catch(err => console.log(err))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name',employee.name);
        formData.append('email',employee.email);
        formData.append('salary',employee.salary);
        formData.append('address',employee.address);
        formData.append('phone',employee.phone);
        formData.append('category_id',employee.category_id);
        formData.append('image',employee.image);
        console.log(formData.get('image'))
        axios.put('http://localhost:3001/edit_employee/'+id, formData)
            .then(result => {
                if (result.data.Status) {
                    nav(`/admin_dashboard/${adminId}/employee`)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Edit Employee</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label for="inputName" className='form-label'>
                            Name
                        </label><br></br>
                        <input type="text" className='form-ctrl rounded-0 w-100'
                            id="inputName" placeholder='Enter Name' value={employee.name}
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}>
                        </input>
                    </div>
                    <div className='col-12'>
                        <label for="inputEmail" className='form-label'>
                            Email
                        </label><br></br>
                        <input type='email' className='form-ctrl rounded-0 w-100' value={employee.email}
                            id='inputEmail' placeholder='Enter Email' autoComplete='off'
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}>
                        </input>
                    </div>
                    <div className='col-12'>
                        <label for='inputSalary' className='form-label'>
                            Salary
                        </label><br></br>
                        <input type='text' className='form-ctrl rounded-0 w-100' value={employee.salary}
                            id='inputSalary' placeholder='Enter Salary' autoComplete='off'
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}>
                        </input>
                    </div>
                    <div className='col-12'>
                        <label for='inputAddress' className='form-label'>
                            Address
                        </label><br></br>
                        <input type='text' className='form-ctrl rounded-0 w-100' value={employee.address}
                            id='inputAddress' placeholder='Enter Address' autoComplete='off'
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}>
                        </input>
                    </div>
                    <div className='col-12'>
                            <label for='inputPhone' className='form-label'>
                                Phone
                            </label><br></br>
                            <input type='text' className='form-ctrl rounded-0 w-100'
                                id='inputPhone' placeholder='Enter Phone No' autoComplete='off' value={employee.phone}
                                onChange={(e)=>setEmployee({...employee,phone: e.target.value})}>
                            </input>
                        </div>
                    <div className='col-12'>
                        <label for='editcategory' className='form-label'>
                            Category
                        </label><br></br>
                        <select name='editcategory' id='editcategory' className='form-select' placeholder='select'
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                            {category.map(d=>{
                                return <option value={d.Id} >{d.Name}</option>
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
                            Edit Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEmployee