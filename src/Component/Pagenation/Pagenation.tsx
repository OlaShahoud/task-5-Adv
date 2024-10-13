import { useState } from "react"
import'./Pagenation.css'
import prev from './../../assets/img/prev.png'
import next from './../../assets/img/next.png'
const Pagenation = ({totalPostes,postsPerPage,setCurrentPage,currentPage}:{totalPostes:Number|bigint|any,postsPerPage:Number|bigint|any,setCurrentPage:Number|bigint|any,currentPage:Number|bigint|any}) => {
    const totalPages =Math.ceil(totalPostes/postsPerPage)
    console.log(totalPages)
    console.log(currentPage)
    const PaginationNumbersPages = () => {
        const pagenumberArray: (number | string)[] = [];
        if (window.innerWidth < 576) {pagenumberArray.push(currentPage);}
         else if (window.innerWidth < 768) {pagenumberArray.push(currentPage);
            if (currentPage < totalPages - 1) {
                pagenumberArray.push('...');
            }
            pagenumberArray.push(totalPages - 1);
        } else { if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) {
                    pagenumberArray.push(i);
                }
            } else {
                pagenumberArray.push(0);
                if (currentPage > 2) {
                    pagenumberArray.push('...');
                }
                if (currentPage <= 2) {
                    pagenumberArray.push(1, 2);
                } else {
                    if (currentPage > 1) pagenumberArray.push(currentPage - 1);
                    pagenumberArray.push(currentPage);
                    if (currentPage < totalPages - 2) pagenumberArray.push(currentPage + 1);
                }
                if (currentPage < totalPages - 3 && currentPage !== totalPages - 2) {
                    pagenumberArray.push('...');
                }
                if (pagenumberArray[pagenumberArray.length - 1] !== totalPages - 1) {
                    pagenumberArray.push(totalPages - 1);
                }
            }
        }

        return pagenumberArray;
    };
    const[pageNumberLimit]=useState<number> (8)
    const[maxPageNumberLimit,setMaxPageNumberLimit]=useState<number> (5)
    const[minPageNumberLimit,setMinPageNumberLimit]=useState <number> (1)
 const handleNextPage=()=>{
    setCurrentPage(currentPage+1)
        if(currentPage+1>maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit)
        }
    }
    const handlePrevPage=()=>{ 
        console.log(maxPageNumberLimit)
        setCurrentPage(currentPage-1)
        if((currentPage-1)%pageNumberLimit==0){
            setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit)
        }
    }
    let pages=[]
    for(let i=1;i<=Math.ceil(totalPostes/postsPerPage);i++){
        pages.push(i)

    }

  return (
    <div className="pagenation">
        <button className="prev" onClick={handlePrevPage} disabled={currentPage==pages[0]?true:false}><img src={prev} alt="prev" /> </button>
        {PaginationNumbersPages().map((number, index) => (
                    <button
                        key={index}
                        onClick={() => typeof number === 'number' && setCurrentPage(number)}
                        className={ currentPage === number ? 'active prev' : 'prev'}
                        disabled={number === '...'}
                    >
                        {typeof number === 'number' ? number + 1 : '...'}
                    </button>
                ))}
  
       <button className="prev" onClick={handleNextPage} disabled={currentPage==pages.length-1?true:false}><img src={next} alt="next" /></button>

    </div>
)}

export default Pagenation
