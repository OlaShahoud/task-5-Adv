
import { useState } from 'react'
import './SignIn.css'
import axios from 'axios'
import logo from '../../assets/img/Logo.png'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
const [ email,setEmail] =useState('')
const [ password,setPassword] =useState('')
const navigate =useNavigate()
function send(){
 axios.post('https://test1.focal-x.com/api/login',{
    email:email,
    password:password
  }).then(res=>{console.log(res)
    localStorage.setItem('token',`Bearer ${res.data.token}`)
    localStorage.setItem('profile_image_url',`${res.data.user.profile_image_url}`)
   localStorage.setItem('user_name',`${res.data.user.first_name}${res.data.user.last_name}`)
   navigate('/Dashbord')
  })
  .catch(error=>console.log(error))
 
}
  return (
 <div className='SignIn' id='SignIn'>  
<div className='Center'>
<div className='formAll'>
    <img className='logo-img' src={logo} alt="Logo" />
    <h1 className='Title-Sign'> SIGN IN</h1>
    <p className='paragraf-Sign'>Enter your credentials to access your account</p>
 <form >
  <div className="form-style"> 
   <label htmlFor="Email">Email</label>
   <input id="Email" type="text" placeholder=' Enter your Email' onChange={(e)=>setEmail(e.target.value)} />
   </div>
   <div className="form-style"> 
   <label htmlFor="Password" >Password</label>
   <input id="Password" type="text" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} />
   </div>
   </form>
   <button className='btn-SignIn' onClick={()=>send()}>SIGN IN</button>
   <p className='pAccount'>Don’t have an account ? <span className='Create'> <Link to="/logout" className='Create'>Create one </Link></span></p>
</div>
</div>
</div>
  )
}

export default SignIn
