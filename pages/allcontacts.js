/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import Loading from "../components/Loading";
import {useRouter} from "next/dist/client/router";
import {
    getDocs,
    getDoc,
    doc,
    query,
    collection,
    arrayRemove,
    updateDoc,
    limit,
    startAfter
} from "firebase/firestore";
import {firestore,} from "../config/fire-config";
import AllRecords from "../components/AllRecords";
import Menu from "../components/menu";
import Footer from "../components/footer";
import AddContact from "../components/AddContact";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function AllContacts() {

    
    const router = useRouter();
        // const { user, loading } = useUsers();
    const [auth,
        setAuth] = useState(false);
    const [userData,
        setUserData] = useState([]);
    const [filteredData,
        setFilteredData] = useState();
    const [filteringData,
        setFilteringData] = useState();
    const [queryBy,
        setQueryBy] = useState("Name");
    const [matadata,
        setMataData] = useState();
    const [deleteValue,
        setDeleteValue] = useState();
    const [lastDoc,
        setLastDoc] = useState();
    const [dataloading,
        setDataLoading] = useState(false);
    const [doclength,
        setDocLength] = useState();
    const [dropdown,
        setDropdown] = useState(false);
    const [menu, setMenu] = useState(false)
    const showUsersOnces = 5;
    const getAllUsers = async() => {
        setDataLoading(true)
        const userArray = [];
        const users = query(collection(firestore, `users`), limit(showUsersOnces));
        await getDocs(users).then((resp) => {
            resp
                .docs
                .map((value) => {
                    userArray.push(value.data());
                });
            setUserData([userArray]);
            setDocLength(resp
                ?.docs
                    ?.length)
            if (resp
                ?.docs
                    ?.length) {

                setLastDoc(resp
                    ?.docs[resp.docs.length - 1]);
            }
        });
        setDataLoading(false)
    };

    const getMoreContents = async() => {
        setDataLoading(true)
        const userArray = [];
        const users = query(collection(firestore, `users`), startAfter(lastDoc), limit(showUsersOnces));
        await getDocs(users).then((resp) => {
            resp
                .docs
                .map((value) => {
                    userArray.push(value.data());
                });
            const newArray = userData[0].concat(userArray);
            setUserData([newArray]);
            setDocLength(resp
                ?.docs
                    ?.length)
            if (resp
                ?.docs
                    ?.length) {
                setLastDoc(resp
                    ?.docs[resp.docs.length - 1]);
            }
        });
        setDataLoading(false)
    }
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

    const deleteUser = async(index) => {
        if (filteredData
            ?.length) {
            setFilteredData();
            await updateDoc(doc(firestore, "mata-data", "details"), {
                contacts: arrayRemove({name: deleteValue.name, phone: deleteValue.phone, city: deleteValue.city, uid: deleteValue.uid})
            });
            userData[0]
                ?.map((val, ind) => {
                    if (val.uid === filteredData[0].uid) {
                        let new_array = userData[0];
                        new_array.splice(ind, 1);
                        setUserData([new_array]);
                    }
                })
        } else {
            console.log("ok", userData[0][index].name, userData[0][index].phone, userData[0][index].city, userData[0][index].uid,)
            await updateDoc(doc(firestore, "mata-data", "details"), {
                contacts: arrayRemove({name: userData[0][index].name,
                    phone: userData[0][index].phone,
                    city: userData[0][index].city,
                    uid: userData[0][index].uid
                })
            }).then((res) => {
                console.log(res, "res")
                console.log(userData[0][index])
            }).catch((err) => {
                console.group(err, "err")
            });
            setTimeout(() => {
                let new_array = userData[0];
                new_array.splice(index, 1);
                setUserData([new_array]);
            }, 3000);
        }
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
        setDeleteValue(values);
        setFilteringData();
        const flitered_array = [];
        await getDoc(doc(firestore, `users`, values.uid)).then((res) => {
            flitered_array.push(res.data());
        });
        setFilteredData(flitered_array);
    };
    const Auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(Auth, (user) => {
          if (user) {
            getAllUsers();
            getMataData();
            setAuth(true);
          }else(
              router.push("/login")
          ) 
        });
    }, [Auth]);
    
    if (auth) {
        return (
            <div>
                
                <div className="w-full bgcolor min-h-screen">
                    <div
                        className="w-full justify-center items-center bgimageAllContacts flex h-full py-8 2xl:py-20">
                        <div className="w-full flex-col justify-center items-center flex blurs">
                        {menu? <Menu close = {setMenu} />:null}
                            <div
                                className="w-11/12 sm:w-[534px] 2xl:w-[650px] bg-white flex justify-center items-center py-5 mt-20 blurbg flex-col rounded-2xl">
                                <div className="w-11/12 flex justify-center flex-col ">
                                    <div
                                        className="w-full flex justify-center items-center mt-3 mb-6 lg:justify-start">
                                        <div
                                            className="relative flex rounded-full h-10 bg-white py-3 pl-1 items-center">
                                            <div
                                                className="cursor-pointer flex justify-center items-center rounded-full h-7 w-7 ">
                                                <svg 
                                                    onClick={()=>setMenu(true)}
                                                    width="30"
                                                    height="25"
                                                    viewBox="0 0 30 25"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <g filter="url(#filter0_d_17_731)">
                                                        <path d="M4.78516 7.77246H25.1342V9.54246H4.78516V7.77246Z" fill="black"/>
                                                        <path d="M4.78516 0.694336H25.1342V2.46334H4.78516V0.694336Z" fill="black"/>
                                                        <path d="M4.78516 14.8506H25.1342V16.6196H4.78516V14.8506Z" fill="black"/>
                                                    </g>
                                                    <defs>
                                                        <filter
                                                            id="filter0_d_17_731"
                                                            x="0.785156"
                                                            y="0.694336"
                                                            width="28.3496"
                                                            height="23.9248"
                                                            filterUnits="userSpaceOnUse"
                                                            colorInterpolationFilters="sRGB">
                                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                            <feColorMatrix
                                                                in="SourceAlpha"
                                                                type="matrix"
                                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                result="hardAlpha"/>
                                                            <feOffset dy="4"/>
                                                            <feGaussianBlur stdDeviation="2"/>
                                                            <feComposite in2="hardAlpha" operator="out"/>
                                                            <feColorMatrix
                                                                type="matrix"
                                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                                            <feBlend
                                                                mode="normal"
                                                                in2="BackgroundImageFix"
                                                                result="effect1_dropShadow_17_731"/>
                                                            <feBlend
                                                                mode="normal"
                                                                in="SourceGraphic"
                                                                in2="effect1_dropShadow_17_731"
                                                                result="shape"/>
                                                        </filter>
                                                    </defs>
                                                </svg>

                                            </div>
                                            <input
                                                onChange={(e) => {
                                                match(e);
                                            }}
                                                type="text"
                                                className="w-11/12 sm:w-[370px] px-2 py-1 border-[1px] border-[#253A2D] rounded-lg outline-none ml-2"
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
                                            {dropdown && <div className="right-0 top-11 w-11/12 sm:w-32 shadow-xl border-[1px] border-gray-100 absolute  bg-white p-3">
                                                    <button onClick={() => setDropdown(!dropdown)} className="flex w-full justify-end items-center">
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
                                                    <button onClick={(e) => {setQueryBy("Name");setDropdown(false)}} className="text-left hover:text-[#62BB6A] w-full py-2">
                                                        By Name
                                                    </button>
                                                    <button onClick={(e) => {setQueryBy("City");setDropdown(false)}} className="text-left hover:text-[#62BB6A] w-full py-2">
                                                        By City
                                                    </button>
                                                    <button onClick={(e) => {setQueryBy("Number");setDropdown(false)}} className="text-left hover:text-[#62BB6A] w-full py-2">
                                                        By Number
                                                    </button>
                                                </div>}
                                            {/* <select
                                                onChange={(e) => setQueryBy(e.target.value)}
                                                name=""
                                                id=""
                                                className="outline-none rounded-full border-0">
                                                <option value="Name">By Name</option>
                                                <option value="City">By City</option>
                                                <option value="Number">By Number</option>
                                            </select> */}
                                            {filteringData
                                                ?.length > 0
                                                    ? (
                                                        <div
                                                            className="absolute top-10 bg-white w-11/12 ml-3 mt-1 p-1 h-48 overflow-y-scroll">
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
                                    <div className="flex">
                                        <p className="text-black ml-2  font-semibold text-2xl" >All Contacts</p>
                                    </div>

                                    <div className="flex flex-col w-full mt-2 h-[380px] overflow-y-scroll pr-2">
                                        {!filteredData
                                            ? userData[0]
                                                ?.map((value, ind) => (<AllRecords
                                                    id={value.uid}
                                                    value={value}
                                                    index={ind}
                                                    key={ind + value.phone}
                                                    deleteUser={deleteUser}/>))
                                                : filteredData
                                                    ? filteredData
                                                        ?.map((value, ind) => (value
                                                            ? <AllRecords
                                                                    id={value.uid}
                                                                    value={value}
                                                                    index={ind}
                                                                    key={ind + value.phone}
                                                                    deleteUser={deleteUser}/>
                                                            : null))
                                                        : null}
                                        {!filteredData
                                            ? <div className="flex justify-center w-full items-center">
                                                    {dataloading
                                                        ? <svg
                                                                role="status"
                                                                className="inline mt-2 mr-2 w-4 h-4 text-white animate-spin dark:text-gray-600 fill-blue-600"
                                                                viewBox="0 0 100 101"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                    fill="currentColor"/>
                                                                <path
                                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                    fill="black"/>
                                                            </svg>
                                                        : <button
                                                            disabled={doclength < showUsersOnces}
                                                            type="button"
                                                            onClick={getMoreContents}
                                                            className={`w-8 h-8 rounded-full bg-white flex justify-center items-center ${doclength >= showUsersOnces
                                                            ? "animate-bounce "
                                                            : 'cursor-default'} mt-2 outline-none text-gray-600 hover:text-black text-xl font-semibold`}>
                                                            <svg
                                                                className="w-6 h-6 text-blue-500"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor">
                                                                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                                            </svg>
                                                        </button>
}</div>
                                            : null
}
                                    </div>
                                </div>
                                <div className="my-3 w-11/12">
                                <AddContact/>
                                </div>
                                <div className="my-3 w-11/12">
                                <Footer/>
                                </div>
                        </div>
                        
                        </div>
                    </div>
                </div>
               
            </div>
        );
    } else {
        return <Loading/>;
    }
}

export default AllContacts;
