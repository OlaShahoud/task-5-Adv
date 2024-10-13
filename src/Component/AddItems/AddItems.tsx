import { useState } from "react"
import Add from "../Add/Add"
import Sidebar from "../Sidebar/Sidebar"

import'./AddItems.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"
const AddItems = () => {
  const title:String='ADD NEW ITEM'
  const navigate=useNavigate()
const [name,setName]=useState<string>('')
const [price,setPrice]=useState<string>('')
const [selectedFile,setSelectFile]=useState<string>('')

const handleSave =()=>{
  console.log( {name:name,
    price:price,
    image:selectedFile})
    axios.post('https://test1.focal-x.com/api/items',{
      name:name,
      price:price,
      image:selectedFile
      
    },{
      headers:{Authorization:localStorage.getItem('token'),
        "Content-Type":"multipart/form-data"
      }
    }).then(res=>{console.log(res.data)
      navigate('/Dashbord')
    }).catch(error=>console.log(error))

}
return (
    <div className="flex">
<Sidebar/>
<Add title={title} setName={setName} setPrice={setPrice} handleSave={handleSave}    setSelectFile={setSelectFile} price='' name='' ImageUrl=''  />
</div>
  )
}

export default AddItems
