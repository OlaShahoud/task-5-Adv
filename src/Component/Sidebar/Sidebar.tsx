import './Sidebar.css'
import logo from './../../assets/img/Logo.png'
import iproduct from './../../assets/img/iProduct.png'
import iorder from './../../assets/img/Vector.png'
import ilogout from './../../assets/img/logOut.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate=useNavigate()
  const[data,setData]=useState('')
useEffect(()=>{
  setData(JSON.parse(JSON.stringify(localStorage.getItem("profile_image_url"))))
},[])

const dataBtn=[
{icon:iproduct,
paragraf:"Products"
},
{icon:iorder,
paragraf:"Favorites"
}, 
{icon:iorder,
paragraf:"order list"
}
]
const handleLogout =  () => {
  axios.post('https://test1.focal-x.com/api/logout', {}, {
      headers: {
        Authorization:localStorage.getItem('token'), 
      },
    }).then(res=>{ console.log(res)   
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('profile_image_url');
      navigate('/login'); 
    }).catch (error=>{console.log(error)  
      alert('Please try again.');}) 
  
   
  
};
  return (
    <div className='sideBar'>
      <div className='container-1'>
     <div className='Logo-Dash'> <img  src={logo} alt=""  /></div>
     <div className='profile-img'> <img  src={data} alt="gvgvh" /></div>
      <h1 className='h-Dash'>{localStorage.getItem('user_name')}</h1>
      </div>
      <div className='Btn-Dash'>
     {dataBtn.map((element,index)=>{return(
      <button className='btn-Dash' key={index}> <img className='icon-img' src={element.icon} alt="icon" />{element.paragraf}</button>
     )})}
  </div>
      <div className='logOut'>
<button className='btn-logOut' onClick={handleLogout}>Logout <img src={ilogout} alt="Logout" /></button>
      </div>
    
    </div>
  )
}

export default Sidebar
