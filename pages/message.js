import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import {auth} from '../config/fire-config';
import {useRouter} from 'next/router';
import {getDocs, query, collection} from "firebase/firestore";
import {firestore} from "../config/fire-config";
import Footer from '../components/footer';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from '../components/Loading';
const Message = () => {
    const router = useRouter();
    const [dropdown,
        setDropdown] = useState(false);
    const [menu,
        setMenu] = useState(false)
    const [filteringData,
        setFilteringData] = useState();
    const [matadata,
        setMataData] = useState();
    const [queryBy,
        setQueryBy] = useState("Name");
    const [notification,
        setNotification] = useState();
    const [filter,
        setFilter] = useState();
    const [message,
        setMessage] = useState();
        const [messageSend,
            setMessageSend] = useState();
    const [sending,
        setSending] = useState(false);
    const [auth, setAuth] = useState(false)
    const sendMessage = (event) => {
        setSending(true);
        event.preventDefault();
        console.log(message, queryBy, filter);
        setSending(false);
        setMessageSend("Message Send Successfully")
        setTimeout(() => {
            setMessageSend("")
        }, 3000);
    };
    const getMataData = async() => {
        const contacts = query(collection(firestore, `mata-data`));
        await getDocs(contacts).then((resp) => {
            resp
                .docs
                .map((value) => {
                    setMataData(value.data().contacts);
                });
        });
    };
    const match = (event) => {
        let new_array = [];
        matadata
            ?.map((val, index) => {
                if (queryBy === "Name") {
                    if (val.name.toLowerCase().includes(event.target.value)) {
                        new_array.push(val);
                    }
                } else if (queryBy === "City") {
                    if (val.city.toLowerCase().includes(event.target.value)) {
                        new_array.push(val);
                    }
                } else if (queryBy === "Number") {
                    if (val.phone.toLowerCase().includes(event.target.value)) {
                        new_array.push(val);
                    }
                }
            });
        setFilteringData(new_array);

    };
    const selectedUser = async(values) => {
       
        if (queryBy === "Name") {
            setFilter(values.name)
            setNotification(`Send message to only where ${queryBy} = ${values.name}`)
        }
        if (queryBy === "Number") {
            setFilter(values.phone)
            setNotification(`Send message to only where ${queryBy} = ${values.phone}`)
        }
        if (queryBy === "City") {
            setFilter(values.city)
            setNotification(`Send message to only where ${queryBy} = ${values.city}`)
        }

        setFilteringData();
    };
    const Auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(Auth, (user) => {
            if (user) {
                getMataData();
              setAuth(true);
            }else(
                router.push("/login")
            ) 
          });
        
    }, [Auth]);
   if(auth){
    return (
        <div className='bgcolor flex justify-center items-center  min-h-screen w-full'>
            <div
                className="w-11/12 sm:w-[534px] 2xl:w-[640px] bg-white flex h-[580px] items-center mb-2 mt-10 blurbg flex-col rounded-2xl">
                <div className="w-11/12 flex justify-center flex-col ">
                    <div className="w-full flex justify-center items-center mt-3 mb-6">
                        <div className="relative w-full flex flex-col bg-white py-3 pl-1 items-center">
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
                                <h1 className="w-full text-center my-3 font-sans font-semibold text-2xl text-black">
                                    Send Message
                                </h1>
                            </div>
                            <div
                                className="w-full flex justify-center items-center mt-3 mb-6 lg:justify-start">
                                <div
                                    className="relative flex justify-center w-full rounded-full h-10 bg-white py-3 pl-1 items-center">

                                    <input
                                        disabled={queryBy === "All" || !queryBy}
                                        onChange={(e) => {
                                        match(e);
                                        setFilter(e.target.value);
                                        setNotification(`Send message to only where ${queryBy} = ${e.target.value && e.target.value}`)
                                    }}
                                        value={queryBy !== "All"
                                        ? filter
                                        : "Filter"}
                                        type="text"
                                        className="w-10/12 sm:w-[370px] px-2 py-1 border-[1px] border-[#253A2D] rounded-lg outline-none ml-2"
                                        placeholder="Search"/>
                                    <button
                                        type="button"
                                        onClick={() => setDropdown(!dropdown)}
                                        className={`relative outline-none ml-2.5 w-8 h-8 flex justify-center items-center rounded-lg bg-[#62BB6A] `}>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.0774 0.995876C15.14 1.11921 15.1593 1.26001 15.1323 1.39566C15.1053 1.5313 15.0334 1.65394 14.9284 1.74388L9.66936 7.00988V14.9359C9.67593 15.0715 9.63915 15.2056 9.56435 15.3189C9.48956 15.4322 9.38064 15.5187 9.25338 15.5659C9.16841 15.5999 9.07789 15.6178 8.98638 15.6189C8.89676 15.6215 8.8076 15.605 8.72484 15.5705C8.64209 15.536 8.56761 15.4843 8.50637 15.4189L5.77636 12.6789C5.71213 12.6165 5.6613 12.5416 5.62691 12.4589C5.59253 12.3763 5.57534 12.2874 5.57638 12.1979V7.00988L0.317374 1.74388C0.212292 1.65394 0.140476 1.5313 0.113455 1.39566C0.0864345 1.26001 0.105758 1.11921 0.168357 0.995876C0.215082 0.868415 0.301332 0.759217 0.414481 0.684204C0.52763 0.609191 0.661789 0.572286 0.797385 0.578876H14.4504C14.5856 0.572721 14.7193 0.609827 14.8321 0.68481C14.9448 0.759794 15.0308 0.868754 15.0774 0.995876Z"
                                                fill="white"/>
                                        </svg>

                                    </button>
                                    {dropdown && <div
                                        className="right-0 top-11 w-32 shadow-xl border-[1px] border-gray-100 absolute  bg-white p-3">
                                        <button
                                            onClick={() => setDropdown(!dropdown)}
                                            className="flex w-full justify-end items-center">
                                            <svg
                                                width="15"
                                                height="16"
                                                viewBox="0 0 15 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M14.8579 14.4336L13.8159 15.4756L7.56689 9.22559L1.31689 15.4756L0.274902 14.4336L6.5249 8.18358L0.274902 1.93459L1.31689 0.892578L7.56689 7.14258L13.8159 0.892578L14.8579 1.93459L8.60791 8.18358L14.8579 14.4336Z"
                                                    fill="black"/>
                                            </svg>

                                        </button>
                                        <button
                                            onClick={(e) => {
                                            setQueryBy("Name");
                                            setDropdown(false)
                                        }}
                                            className="text-left hover:text-[#62BB6A] w-full py-2">
                                            By Name
                                        </button>
                                        <button
                                            onClick={(e) => {
                                            setQueryBy("City");
                                            setDropdown(false)
                                        }}
                                            className="text-left hover:text-[#62BB6A] w-full py-2">
                                            By City
                                        </button>
                                        <button
                                            onClick={(e) => {
                                            setQueryBy("Number");
                                            setDropdown(false)
                                        }}
                                            className="text-left hover:text-[#62BB6A] w-full py-2">
                                            By Number
                                        </button>
                                    </div>}
                                    {filteringData
                                        ?.length > 0
                                            ? (
                                                <div
                                                    className="absolute top-10 bg-white w-7/12 ml-3 mt-1 p-1 h-48 overflow-y-scroll">
                                                    {filteringData.map((val, ind) => (
                                                        <div key={ind} className="flex justify-center">
                                                            <button
                                                                onClick={() => {
                                                                selectedUser(val);
                                                            }}
                                                                type="button"
                                                                className="w-11/12 text-xs border-b-2 py-1 hover:bg-gray-300 border-gray-300">
                                                                {val
                                                                    ? `${val.name} : ${val.city} ${val.phone}`
                                                                    : "No Record Found"}
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                            : null}
                                </div>
                            </div>

                            {notification && <div
                                className='h-[35px] rounded-lg text-[14px] w-[85%] flex justify-center items-center bg-[#253A2D] text-white'>
                                {notification && filter && queryBy !== "All"
                                    ? notification
                                    : null}
                            </div>}
                            <form
                                onSubmit={(e) => {
                                sendMessage(e);
                            }}
                                className='mb-12 flex rounded-lg flex-col w-full bg-[#e7e6e6] h-[200px] mt-2'>
                                <textarea
                                  required
                                    onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                                    placeholder={message
                                    ? message
                                    : "Message"}
                                    className="w-full rounded-lg bg-[#e7e6e6] h-[150px] outline-none p-2"></textarea>
                                <div className="flex w-full justify-end m-1">
                                    <button
                                        disabled={sending}
                                        type="submit"
                                        className="flex justify-end mr-3 text-white w-72 rounded-full py-1.5">
                                        {sending
                                            ? (
                                                <svg
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
                                            )
                                            : <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M29 0H5C2.23858 0 0 2.23858 0 5V28C0 30.7614 2.23858 33 5 33H29C31.7614 33 34 30.7614 34 28V5C34 2.23858 31.7614 0 29 0Z" fill="#62BB6A"/>
                                            <path d="M26.0729 15.5433H26.0669L8.66086 8.34936C8.51602 8.28682 8.35817 8.26037 8.20087 8.27234C8.04316 8.28744 7.89166 8.34136 7.75989 8.42932C7.61882 8.52006 7.50282 8.64486 7.42261 8.79217C7.3424 8.93949 7.30054 9.1046 7.30087 9.27234V13.8723C7.30134 14.1003 7.38161 14.3209 7.52774 14.4959C7.67387 14.6709 7.87662 14.7892 8.10086 14.8303L17.5939 16.5793C17.631 16.5863 17.6646 16.6059 17.6889 16.6349C17.7132 16.664 17.7266 16.7005 17.7269 16.7383C17.726 16.7749 17.713 16.81 17.6899 16.8383C17.6645 16.8685 17.6289 16.8885 17.5899 16.8943L8.09686 18.6433C7.87262 18.684 7.66977 18.8021 7.52359 18.977C7.37742 19.1518 7.29719 19.3724 7.29688 19.6003V24.2003C7.2967 24.359 7.33601 24.5152 7.41126 24.6548C7.4865 24.7945 7.5953 24.9132 7.72788 25.0004C7.8877 25.1063 8.07512 25.163 8.26688 25.1633C8.40045 25.1636 8.53273 25.137 8.65588 25.0853L26.0619 17.9323H26.0689C26.3022 17.8318 26.501 17.6653 26.6406 17.4531C26.7803 17.2409 26.8547 16.9924 26.8547 16.7383C26.8547 16.4843 26.7803 16.2358 26.6406 16.0236C26.501 15.8114 26.3022 15.6448 26.0689 15.5443L26.0729 15.5433Z" fill="white"/>
                                            </svg>
                                            }
                                    </button>
                                </div>
                            </form>
                            {messageSend && 
                             <p className='w-full  py-3 flex justify-center text-lg font-semibold text-black'>{ messageSend}</p>

                            }
                            <Footer/>
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

export default Message