import './Add.css'
import prev from './../../assets/img/Control.png'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import uploade from './../../assets/img/Upload icon.png'
import defaultImage from './../../assets/img/error.png';

const Add = ({title,setName,setPrice,handleSave, setSelectFile,price, name,ImageUrl}:{title:String,setName:any,setPrice:any,handleSave:any,setSelectFile:any,price:string, name:string,ImageUrl:string}) => {
const navigate=useNavigate()
const [prevUrl, setPrevUrl] = useState<string>('');
useEffect(()=>{setPrevUrl(ImageUrl)},[ImageUrl])
const data=[
    {lablle:'Name',
     placeholder:"Enter the product name",
    class:"inputAdd inputAdd1",
    type:'text',
    name:name,
  },
     {lablle:"Price",
    placeholder:"Enter the product price" ,
    class:"inputAdd",
    type:'number',
     name:price,
     }]

    const handlebackPage=()=>{
        navigate('/Dashbord')
    }
    const inputRef=useRef<any>()
    const onChoosefile=(e:any)=>{
      inputRef.current.click()
      setSelectFile(e.target.files[0])
      
} 



const handleInput= (index:any,e:any)=>{
     if(index==0){
        setName(e.target.value)
        console.log(index)

      }
      if(index==1){setPrice(e.target.value)}

    }
    const handleImageError = () => {
    setPrevUrl(defaultImage)
  };
  const handleImageChange = (e: any) => {
    inputRef.current.click()
  const ImageUrl=URL.createObjectURL(e.target.files[0])
   setPrevUrl(ImageUrl)
    console.log(prevUrl)
    setSelectFile(e.target.files[0])
  
  
  };
     return (
    <div className='Add'>
    <div className='imgAdd'><img  onClick={handlebackPage} src={prev} alt="prev" /></div>
      <h1 className='AddTitle'>{title}</h1>
      <div className='AddForm'>
      <form className='formAdd'>
        {data.map((item,index)=>{return(<>
        <label className='lableAdd' key={index} htmlFor={item.lablle}>{item.lablle}</label>
        <input className={item.class} key={index} id={item.lablle} type={item.type} defaultValue={item.name} placeholder={item.placeholder} onChange={(e)=>handleInput(index,e)}  /></>)})}
      </form>
      <div className='imageAdd'>
      <label  className='lableAdd' htmlFor="Image">Image</label>
    <div className='inputDownload'>
      <input onChange={(e)=>handleImageChange(e)} type="file" ref={inputRef} className='inputImage' id="Image"   />
     <button className='btn-download' onClick={(e)=>onChoosefile(e)}>  
        {prevUrl? (
      <img src={prevUrl} alt="Preview" onError={handleImageError} className='btn-download'/>) 
      : (
      <img src={uploade} alt='Upload icon'  />
       )}</button>
      </div>
      </div>
     </div>
     <div className='btnAdd'> <button className='BtnAdd' onClick={handleSave}>Save</button></div>
    </div>
  )
}

export default Add
