import React,{useState} from 'react'
import Details from './Details';

const AllRecords = (props) => {
    const {id,value,deleteUser,index} = props;
    const [showDetails, setShowDetails] = useState(false)
  return (
    <>
    {showDetails?
     
        <Details id={id} value={value} hide={setShowDetails} deleteUser={deleteUser} index={index}/>
  
    : null}

<div className='flex w-full items-center mt-4'>
  <div
  className="flex w-11/12 flex-col shadow-xl rounded-lg border-[1px] border-[#62BB6A]"
>
  
    <span className="text-black text-md font-sans font-semibold ml-4">
      {value.name}
    </span>
  
    <div className='flex ml-4'>
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.872 13.7631L13.627 15.9901C13.4684 16.1435 13.2802 16.2631 13.0739 16.3415C12.8676 16.4198 12.6475 16.4555 12.427 16.4461C10.5675 16.2739 8.7888 15.6037 7.278 14.5061C4.80492 12.8031 2.7501 10.5616 1.268 7.9501C0.616379 6.80664 0.239781 5.52724 0.168003 4.2131C0.156998 3.99017 0.191781 3.76736 0.270208 3.55839C0.348635 3.34942 0.469042 3.15874 0.624002 2.9981L2.869 0.753108C2.9525 0.664778 3.05639 0.598276 3.17157 0.559443C3.28675 0.520611 3.40969 0.510633 3.52963 0.530376C3.64956 0.550118 3.76282 0.598977 3.85947 0.672679C3.95613 0.746381 4.03322 0.842672 4.084 0.953105L5.89 4.3791C5.97692 4.56532 6.00435 4.77381 5.96857 4.97618C5.93278 5.17855 5.83552 5.36499 5.69 5.51011L4.863 6.3361C4.81083 6.40395 4.78143 6.48655 4.779 6.57211C5.18815 7.79271 5.92376 8.87796 6.906 9.71011C7.755 10.4891 8.667 11.5441 9.852 11.7941C9.92174 11.8223 9.99728 11.8333 10.0722 11.826C10.147 11.8186 10.219 11.7933 10.282 11.7521L11.244 10.7741C11.4022 10.6385 11.5957 10.5506 11.802 10.5207C12.0082 10.4907 12.2188 10.52 12.409 10.6051H12.426L15.684 12.5281C15.7895 12.5863 15.8801 12.668 15.949 12.7669C16.0178 12.8657 16.063 12.9791 16.0809 13.0982C16.0989 13.2173 16.0892 13.339 16.0527 13.4538C16.0161 13.5685 15.9536 13.6734 15.87 13.7601L15.872 13.7631Z" fill="#253A2D"/>
    </svg>

    <span className="text-[#253A2D] text-sm font-sans ml-2">
      {value.phone}
    </span>
    </div>
  
</div>
<button className='bg-[#253A2D] ml-3 w-7 h-12 flex justify-center items-center rounded-md'
 type="button"
 onClick={()=>{setShowDetails(true)}}
>
 <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.142578 2.44176L2.04257 0.59375L12.6596 11.2108L2.04257 21.8277L0.142578 19.9337L8.88858 11.1877L0.142578 2.44176Z" fill="white"/>
</svg>

</button>
</div>
    </>
  )
}

export default AllRecords