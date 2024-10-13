import Sidebar from "../Sidebar/Sidebar"
import './ShowItems.css'
import prev from './../../assets/img/Control.png'
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import defaultImage from './../../assets/img/error.png'; 
import axios from "axios"
interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  created_at: string|Date;
  updated_at: string|Date;
}
const ShowItems = () => {
  const navigate=useNavigate()
  const[items,setItems]=useState<Product|null|any> (null)
  const params = useParams();
  const [imageSrc, setImageSrc] = useState<string>('');
  useEffect(()=>{

axios.get(`https://test1.focal-x.com/api/items/${params.id}`,
  {headers:{Authorization:localStorage.getItem('token')}})
  .then(res=>{ console.log(res.data)
    setItems(res.data)
  setImageSrc(res.data.image_url)})
  .catch(error=>console.log(error))
  },[])

  const handlebackPage=()=>{
    navigate('/Dashbord')
}
const handleError = () => {
  setImageSrc(defaultImage); 
};
console.log(items)
  return (
    <div className="Show">
     <Sidebar/>
     <div className="ShowItem">
     <div className='imgAdd'><img  onClick={handlebackPage} src={prev} alt="prev" /></div>
     <h1 className="styleH1 titleName"> {items?.name}</h1>
     <div className="imgShow"><img src={imageSrc} onError={handleError} alt="ImgProduct" /></div>
     <div className="divH1">
     <h1 className="styleH1"> Price: <span className="styleSpan  priceSpan">{items?.price} </span></h1>
     <h1 className="styleH1">Added at:<span className="styleSpan priceSpan">{new Date(items?.created_at).toLocaleDateString('en-GB')}</span></h1>
   </div>
<h1 className="styleH1 Ubdate">updated at:<span className="styleSpan updateSpan">{new Date(items?.updated_at).toLocaleDateString('en-GB')}</span></h1>

     </div>
    </div>
  )
}

export default ShowItems
