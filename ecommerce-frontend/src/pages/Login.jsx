import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import API from '../api/api'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStote';

const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: "", password: "" })
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(form)
            const res = await API.post('/auth/login', form)
            useAuthStore.getState().login(res.data.token);
            navigate("/")
        } catch (error) {
            alert("Login Failed")
            console.error(error.response?.data || error.message)
        }
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-evenly items-center gap-6 bg-gray-100 rounded-sm size-100 p-4'>
                <h1 className='font-semibold text-3xl'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className=' flex flex-col gap-2 w-full font-medium'>
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
                        <button className='bg-black text-white px-4 py-1'>Login</button>
                        <Link to="/register" className='text-black underline'>New User</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login
