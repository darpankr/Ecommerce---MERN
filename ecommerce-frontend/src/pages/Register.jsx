import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import API from '../api/api'
import { useAuthStore } from '../store/useAuthStote';

const Register = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: "", password: "" })
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/register', form)
            // localStorage.setItem("token", res.data.tken)
            const register = useAuthStore.getState().register;
            register(res.data.token);
            alert("Successfully Registered")
            navigate("/login")
        } catch (error) {
            alert("Register Failed")
            console.error(error.response?.data || error.message)
        }
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-evenly items-center gap-6 bg-gray-100 rounded-sm size-100 p-4'>
                <h1 className='font-semibold text-3xl'>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className=' flex flex-col gap-2 w-full font-medium justify-center'>
                        <label htmlFor="name">
                            Name
                            <input
                                type="text"
                                name='name'
                                placeholder='example'
                                onChange={handleChange}
                                className='w-full border px-2 py-1 font-normal'
                            />
                        </label>
                        <label htmlFor="email">
                            Email
                            <input
                                type="email"
                                name='email'
                                placeholder='example@test.com'
                                onChange={handleChange}
                                className='w-full border px-2 py-1 font-normal'
                            />
                        </label>
                        <label htmlFor="password">
                            Password
                            <input
                                type="password"
                                name='password'
                                onChange={handleChange}
                                className='w-full border px-2 py-1 font-normal'
                            />
                        </label>
                        <button className='bg-black text-white px-4 py-1'>SignUp</button>
                        <Link to="/login" className='text-black underline'>alreday registerd</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Register
