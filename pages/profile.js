import React,{useState,useEffect} from 'react'
// import useUser from "../hooks/useUser";
import Loading from "../components/Loading";
import { useRouter } from "next/dist/client/router";
import {
  setDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../config/fire-config";
import Link from 'next/link';
import Footer from '../components/footer';
import { getAuth, onAuthStateChanged } from "firebase/auth";
function Profile() {
    const router = useRouter();
//   const {user,loading} = useUser();
  const [auth,setAuth] = useState(false)
  const [name,setName] = useState();
  const [message,setMessage] = useState();
  const [loader,setLoader] = useState(false)
  const updateProfile =async(event)=>{
      event.preventDefault()
      setLoader(true)
    //   await updateDoc(doc(firestore, 'villages','data'), {
    //     villages: arrayUnion(
    //          village
    //       ),
    // })
    setName();
    setMessage("Record Added Successfully")
    setLoader(false)
    setTimeout(() => {
        router.push("/allcontacts")
    }, 2000);
  }
  const Auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(Auth, (user) => {
            if (user) {
              setAuth(true);
            }else(
                router.push("/login")
            ) 
          });
      }, [Auth])
    
     if(auth){
    return (
        
    <div className="w-full bgcolor min-h-screen">
        <div className="w-full justify-center items-center flex h-full">
            <div className="w-full justify-center items-center flex blurs">
                <div className="w-80 flex justify-center items-center py-5 blurbg flex-col lg:w-3/4 rounded-2xl">
                    <div className="w-full lg:w-11/12 flex justify-center ">
                        <div className="w-full lg:w-[50%] bg-white flex rounded-lg flex-col justify-center items-center mt-3 mb-6">
                        <div className="w-full flex-col flex justify-between px-6  mt-4">
                    <Link href="/">
                    <p className="cursor-pointer w-[15px]">
                        <svg
                            width="14"
                            height="23"
                            viewBox="0 0 14 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.55664 11.336L11.8926 2"
                                stroke="#253A2D"
                                strokeWidth="4"
                                strokeLinecap="round"/>
                            <path
                                d="M2.55664 11.3359L11.8926 20.6719"
                                stroke="#253A2D"
                                strokeWidth="4"
                                strokeLinecap="round"/>
                        </svg>
                    </p>
                    </Link>
                        <h1 className=" my-3 font-sans font-semibold text-2xl text-black">
                            Profile
                        </h1>
                    </div>
                            <form onSubmit={updateProfile} >
                            <div className="flex flex-col w-72 lg:w-80 bg-white py-3 items-center">
                                 <p className='w-full justify-start'> Update Password</p>
                                <input placeholder='Enter New Password' required onChange={(e)=>{setName(e.target.value)}} type="text" className="w-full p-4 h-[30px] rounded-lg border-[1px] border-black outline-none"/>
                                
                            </div>
                            <p className='w-full flex justify-center m-2 items-center text-black font-semibold text-xl'>
                                {message? message:null}
                            </p>
                            <div className="flex w-full justify-center my-4 ">
                              <button disabled={loader}  type="submit" className="bg-[#62BB6A] flex justify-center items-center text-white w-56 rounded-full py-1">{loader
                                    ? <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"/>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                    : 'Update Profile'}</button>
                            </div>
                            </form>
                            
                        </div>
                      

                    </div>
                </div>

            </div>
        </div>
    </div>    
    )
     }else{
        return <Loading/>
     }
}

export default Profile