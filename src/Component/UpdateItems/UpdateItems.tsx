import { useNavigate, useParams } from "react-router-dom"
import Add from "../Add/Add"
import Sidebar from "../Sidebar/Sidebar"
import './Update.css'
import { useEffect, useState } from "react"
import axios from "axios"
const UpdateItems = () => {
  const title:String='EDIT ITEM'
   const params=useParams()
   const navigate=useNavigate()

   const [name,setName]=useState<string>("")
  const [price,setPrice]=useState<string>( "")
  const [ImageUrl,setImageUrl]=useState<string>( "")
  const [selectedFile,setSelectFile]=useState(null)
   useEffect(()=>{
  axios.get(`https://test1.focal-x.com/api/items/${params.id}`,
      {headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{console.log(res.data)
      setPrice(res.data.price)
       setName(res.data.name)
      setImageUrl(res.data.image_url)})
      .catch(error=>console.log(error))
      },[])
  console.log(price)
  console.log(name)
  console.log(ImageUrl)
 const handleSave =()=>{
    console.log(
      {name:name,
      price:price,
      image:selectedFile})
      axios.post(`https://test1.focal-x.com/api/items/${params.id}`,{
        name:name,
        price:price,
        image:selectedFile,
        "_method": "PUT"
        
      },{
        headers:{Authorization:localStorage.getItem('token'),
          "Content-Type":"multipart/form-data",
         }
      }).then(res=>{console.log(res.data)
        navigate('/Dashbord')
      }).catch(error=>console.log(error))
  
}
 
  return (
    <div className="ubdate">
    <Sidebar/>
   <Add title={title} setName={setName} setPrice={setPrice} handleSave={handleSave}  setSelectFile={setSelectFile} price={price} name={name} ImageUrl={ImageUrl} />
   
    </div>
  )
}

export default UpdateItems
