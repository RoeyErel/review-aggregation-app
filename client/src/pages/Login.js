import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const img1 = 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80';


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate()
    /**
     * @desc Post data to backend for login
     * @Post Email and password
     * @return Json with id, name and email
     */
    const LoginForm = async (e) => {
        e.preventDefault()
        const userData = {
            email: email,
            password: password
          };
        try{     
            await axios.post(process.env.REACT_APP_API_BASE + '/api/users/login', userData)
            .then(response => {
                if(response.status===400){
                    setError('Invaild credentails')
                }else{
                    navigate('/')
                }
            })
                
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <div className='w-full h-screen'>
                <img className='hidden sm:block absolute w-full h-full object-cover'
                    src={img1} alt=''/>
                <div className=' bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
                <div className='fixed w-full px-4 py-24 z-50'>
                    <div className='max-w-[450px] h-[500px] mx-auto bg-black/75 text-white'>
                        <div className='max-w-[320px] mx-auto py-16'>
                            <div className='flex justify-center items-center'>
                               <h1 className='text-3xl font-bold'>LOGIN</h1> 
                            </div>
                            {error ? <p className='p-3 bg-red-400 my-2' >{error}</p>:null}
                            <form onSubmit={LoginForm}  className='w-full flex flex-col py-4'>
                                <input  onChange={(e) => setEmail(e.target.value)}
                                        className='p-3 my-2 bg-gray-700 rounded'
                                        type="email" 
                                        placeholder='Email'
                                />
                                <input onChange={(e) => setPassword(e.target.value)} 
                                        className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='Password' autoComplete='current-password' />
                                <button className='bg-green-600 py-3 my-6 rounded font-bold'>Sign In</button>
                                <div className='flex justify-between items-center text-sm text-gray-600'>
                                    <div>
                                        <input className='mr-2' type="checkbox"/> Remember Me
                                    </div>
                                    <p>Need Help?</p>
                                </div>
                                    <div className='py-8 flex flex-row'>
                                        <span className='text-gray-600 flex flex-row'>New to Stream.<p className='text-green-600'>io </p> &nbsp;&nbsp;</span>{' '} <Link to='/Signup'>Sign Up</Link> 
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login