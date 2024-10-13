import { useNavigate } from 'react-router-dom'
import './Product.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagenation from '../Pagenation/Pagenation'
import search from './../../assets/img/search-icon.png'
import DeletePopUp from '../deletePopUp/deletePopUp'

const Product = () => {
    const navigate=useNavigate()
    const[items,setItems]=useState<Array<any>> ([])
    const[currentPage,setCurrentPage]=useState<number> (0)
    const[postsPerPage,setPostsPerPage]=useState<number> (8)
    const [Search,setSearch]=useState<string>('')
    const [showPopup, setShowPopup] = useState(false);
    const [productDelete, setProductDelete] = useState<number | null>(null);
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 1439) {
          setPostsPerPage(8);
        } else if (window.innerWidth >= 1200 && window.innerWidth <= 1439) {
          setPostsPerPage(6);
        } else if (window.innerWidth >= 992) {
          setPostsPerPage(4);
        }else if (window.innerWidth >= 558) {
          setPostsPerPage(2);}
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
const getProduct=()=>{ 
  if(!localStorage.getItem('token')){navigate('/')}
axios.get('https://test1.focal-x.com/api/items',
{headers:{Authorization:localStorage.getItem('token')}}
)
.then(res=>{console.log(res)
  setItems(res.data)})
.catch(error=>console.log(error))}
  useEffect(()=>{
     getProduct()
    },[navigate])

    const DeleteProduct = (id: number) => {
      setShowPopup(true);
      setProductDelete(id);
    };
    const handleCancelDelete = () => {
      setShowPopup(false);
      setProductDelete(null);
    };
  
    const handleNoDelete = () => {
      if (productDelete !== null) {
        deleteProduct(productDelete);
      }
    };
    const deleteProduct = (id: number) => {
      const token = localStorage.getItem("token");
  
      axios.delete(`https://test1.focal-x.com/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(() => {
          getProduct()
          setShowPopup(false);
          setProductDelete(null);
        })
        .catch(error => {
          console.error("Error deleting product", error);
        });
    };
    const lastIndex:number=currentPage*postsPerPage
    const firstIndex:number=lastIndex-postsPerPage
     const handleAddItems=()=>{navigate('/Add')}
     const handleEdit=(id:number)=>{navigate(`/Update/${id}`)}
     const handleShow=(id:number)=>{navigate(`/Show/${id}`)}
     const handleSearch=(e:any)=>{setSearch(e.target.value) }
     const filterItem= items.filter(item =>{
  return search.toLowerCase()==''?item:item.name.toLowerCase().includes(Search.toLowerCase())
      }).slice(firstIndex,lastIndex)
  return (
    <div className="search">
    <div className='search-input' >
      <input className ='search-Input' type="text" id=""  placeholder="Search product by name " onChange={(e)=>{handleSearch(e)}}/>
      <img className='img-search' src={search} alt="search" />
      </div>
      <div className="btn-Add"><button className="BTN_ADD" onClick={handleAddItems}>ADD NEW PRODUCT</button></div>
      <div className="all-product">
        {filterItem?.map((element,index)=>{
         return(<>
        <div  className='img' >
            <img className="items-img"key={index} src={element.image_url}  alt="ImgProduct" onClick={()=>handleShow(element.id)} />
        <div key={index}   className="nonevisible">           
<p className='name'>{element.name}</p>
 <div className='btn-pro'>           
<button className='edit' onClick={()=>handleEdit(element.id)}>Edit</button>
<button className='delete' onClick={() =>DeleteProduct(element.id)}>delete</button></div>
</div>
        </div>

      </>)})}
      </div>
<Pagenation totalPostes={items.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
{showPopup?<DeletePopUp  message="Are you sure you want to delete the product?" nodelete={handleNoDelete} Cancel={handleCancelDelete}/>:""}
  </div>
  )
}

export default Product
