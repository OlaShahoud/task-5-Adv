import { useRef, useState } from 'react'
import logo from '../../assets/img/Logo.png'
import uploade from './../../assets/img/Upload icon.png'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const SignUp = () => {
const [ email,setEmail] =useState('')
const [ password,setPassword] =useState('')
const [ rePassword,setRePassword] =useState('')
const [ first,setFirst] =useState('')
const [ last,setLast] =useState('')
const [ img,setImg] =useState<File|null> (null )
const navigate =useNavigate()
function signUp(){
     
axios.post('https://test1.focal-x.com/api/register',{
    first_name:first,
    last_name:last,
    user_name:first+'_'+last,
    email:email,
    password:password,
    password_confirmation:rePassword,
    profile_image:img,
    },
   {headers:{"Content-Type":"multipart/form-data"}})
   .then(res=>{console.log(res)
   localStorage.setItem('token',`Bearer ${res.data.token}`)
   localStorage.setItem('profile_image_url',`${res.data.user.profile_image_url}`)
   localStorage.setItem('user_name',`${res.data.user.first_name}${res.data.user.last_name}`)
   
    navigate('/Dashbord')
   })
     .catch(error=>console.log(error))
  }
  const inputRef=useRef<any>()
const onChoosefile=(e:any)=>{
    inputRef.current.click()
    setImg(e.target.files[0])
    
} 
  return (
    <div className='SignIn'>  
<div className='Center'>
<div className='formAll-Sign'>
    <img className='logo-img' src={logo} alt="Logo" />
    <h1 className='Title-SignUp'> SIGN Up</h1>
    <p className='paragraf-SignUp'>Fill in the following fields to create an account.</p>
 <form >
  <div className="form-style"> 
   <label htmlFor="Name">Name</label>
   <div className='inputDiv'>
   <input className='nameinput' id="Name" type="text" placeholder=' First Name' onChange={(e)=>setFirst(e.target.value)} />
   <input type="text" placeholder=' Last Name' onChange={(e)=>setLast(e.target.value)} />
   </div>
   </div>
   <div className="form-style"> 
   <label htmlFor="Email" >Email</label>
   <input id="Email" type="text" placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} />
   </div>
   <div className="form-style"> 
   <label htmlFor="Password">Password</label>
   <div className='inputDiv'>
   <input  className='nameinput' id="Password" type="text" placeholder=' Enter password' onChange={(e)=>setPassword(e.target.value)} />
   <input type="text" placeholder=' Re-enter your password' onChange={(e)=>setRePassword(e.target.value)}/>
   </div>
   </div>
   <div className="form-style"> 
   <label className='profile'  htmlFor="Profile Image">Profile Image</label>
   <div className='inputDiv'>
   <input  type="file"   className='inputImage' onChange={(e)=>{if(e.target.files!=null){setImg(e.target.files[0])}}} />
   <button className='btn-Sign' onClick={(e)=>onChoosefile(e)}><img src={uploade} alt='Upload icon'  />
</button>

   </div>
   </div>
   </form>
   <button className='btn-SignIn' onClick={signUp}>SIGN Up</button>
   <p className='pAccount'>Do You have an account ? <span className='Create'> <Link to="/" className='Create'>Sign In </Link></span></p>
</div>
</div>
</div>
  )
}

export default SignUp
