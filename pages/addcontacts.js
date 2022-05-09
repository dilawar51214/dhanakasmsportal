/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import {firestore} from "../config/fire-config";
import {
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
    query,
    collection,
    getDocs
} from 'firebase/firestore';
// import useUser from "../hooks/useUser";
import Loading from "../components/Loading";
import {useRouter} from "next/dist/client/router";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import Link from 'next/link';
import { getAuth, onAuthStateChanged } from "firebase/auth";
function AddContacts() {
    const uid = uuidv4()
    const router = useRouter();
    // const {user,loading} = useUser();
    const [cities,
        setCities] = useState(false);
    const [Profession,
        setProfession] = useState(false);
    const [Province,
        setProvince] = useState(false);
    const [relation,
        setRelation] = useState(false)
    const [professions,
        setProfessions] = useState();
    const [newProfession,
        setNewProfession] = useState();
    const [auth,
        setAuth] = useState(false);
    const [message,
        setMessage] = useState('')
    const [loadingData,
        setLoadingData] = useState(false)
    const [citiesArray,
        setCitiesArray] = useState()
    const [matchArray,
        setMatchArray] = useState('')
    const [matchInput,
        setMatchInput] = useState();
    const [allVillages,
        setAllVillages] = useState();
    const [village,
        setVillage] = useState();
    const [matchVillages,
        setMatchVillages] = useState();
    const [selectedValues,
        setSelectedValues] = useState([
        {
            name: "",
            phone: "",
            profession: "",
            city: "",
            province: "",
            address: ""
        }
    ]);
    const relationArray = ["A", "M"]
    const professionArray = [
        "Business",
        "Accounts",
        "Fainance",
        "Engineering",
        "Computer-Science",
        "Medical",
        "Networking",
        "HR",
        "Marketing",
        "farmer",
        "engineer",
        "butcher",
        "barber",
        "carpenter",
        "electrician",
        "plumber",
        "lawyer",
        "scientist",
        "bus driver",
        "designer",
        "journalist",
        "photographer",
        "painter",
        "mechanic",
         "shop assistant",
         "politician",
         "postman",
         "taxi driver",
          "pharmacist",
         "cleaner",
         "gardener",
         "programmer",
         "salesman",
      ];

    const provinceArray = ["Punjab", "Khyber Pakhtunkhwa", "Sindh", "Balochistān", "Gilgit-Baltistan"];

    const handleChange = (event) => {
        let new_array = selectedValues;
        new_array[0][event.target.name] = event.target.value;
        setSelectedValues([...new_array])
    }

    const addPerfession = (value) => {
        let new_array = selectedValues;
        new_array[0]["profession"] = value;
        setSelectedValues([...new_array])
        setProfession(!Profession);
    };
    const addProvince = (value, ind) => {
        let new_array = selectedValues;
        new_array[0]["province"] = value;
        setSelectedValues([...new_array])
        setProvince(!Province);
        fetchCities();
    };
    const addRelation = (value, ind) => {
        let new_array = selectedValues;
        new_array[0]["relation"] = value;
        setSelectedValues([...new_array])
        setRelation(!relation);
    };
    const addCity = (value) => {
        setMatchArray()
        let new_array = selectedValues;
        new_array[0]["city"] = value;
        setSelectedValues([...new_array])
        setCities(!cities);
    };
    const addVillage = (value) => {
        setVillage(value)
        setMatchVillages()
        let new_array = selectedValues;
        new_array[0]["village"] = value;
        setSelectedValues([...new_array])
    };

    const AddNewProfession = () => {
        let array = []
        array = professions;
        array.push(newProfession)
        setProfession(...array)
    }
    const SubmitForm = async(event) => {
        setLoadingData(true)
        event.preventDefault()
        setLoadingData(true)
        if (!selectedValues[0].city) {
            setMessage("Please select Your City")
        } else {
            await setDoc(doc(firestore, 'users', uid), {
                name: selectedValues[0].name,
                phone: selectedValues[0].phone,
                province: selectedValues[0].province,
                city: selectedValues[0].city,
                address: selectedValues[0].address,
                profession: selectedValues[0].profession,
                village: selectedValues[0].village,
                pin: false,
                relation: selectedValues[0].relation,
                uid: uid
            }).then(async() => {
                await updateDoc(doc(firestore, 'mata-data', 'details'), {
                    contacts: arrayUnion({
                        name: selectedValues[0]
                            .name
                            .toLowerCase(),
                        phone: selectedValues[0].phone,
                        city: selectedValues[0]
                            .city
                            .toLowerCase(),
                        uid: uid
                    })
                })
                setMessage("User Record added successfully")
                setTimeout(() => {
                    router.push('/allcontacts')
                    setMessage()
                    setSelectedValues([
                        {
                            name: "",
                            phone: "",
                            profession: "",
                            city: "",
                            province: "",
                            address: ""
                        }
                    ])
                }, 3000);
                setLoadingData(false)
            }).catch((error) => {
                setMessage(error)
            })
        }
        setLoadingData(false)
    }

    const getVillages = async() => {
        const contacts = query(collection(firestore, `villages`));
        await getDocs(contacts).then((resp) => {
            resp
                .docs
                .map((value) => {
                    setAllVillages(value.data().villages);
                });
        });
    }

    const fetchCities = async() => {
        const cities = [];
        await axios
            .get('https://simplemaps.com/static/data/country-cities/pk/pk_spreadsheet.json')
            .then((res) => {
                res
                    .data
                    .map((val) => {
                        if (val[5].includes(selectedValues[0].province)) {
                            cities.push(val[0])
                        }
                    })
                setCitiesArray(cities)
            })
    }

    const match = (event) => {
        selectedValues.city = '';
        selectedValues[0].city = ''
        setMatchInput(event.target.value)
        setMatchArray()
        let matches = [];
        citiesArray
            ?.map((val) => {
                if (val.toLowerCase().includes(event.target.value)) {
                    matches.push(val)
                }
            })
        setMatchArray(matches)
    }

    const matchVillage = (event) => {
        setVillage(event.target.value)
        let matches = [];
        allVillages
            ?.map((val) => {
                if (val.toLowerCase().includes(event.target.value)) {
                    matches.push(val)
                }
            })
        setMatchVillages(matches)
    }
    const Auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(Auth, (user) => {
            if (user) {
                getVillages()
                setAuth(true)
            }else(
                router.push("/login")
            ) 
          });
        setProfessions(professionArray)
    }, [Auth])
   if(auth){
    return (
        <div className="w-full bgcolor ">
            <div
                className="w-full justify-center items-center bgimageAddContacts flex h-full py-16 xl:py-20">
                <div className="w-full justify-center items-center flex blurs h-full">
                    <form
                        onSubmit={SubmitForm}
                        className="w-[90%] md:w-[60%] flex justify-center  blurbg flex-col mt-12 mb-1.5 lg:mt-12 lg:w-[40%] bg-white rounded-2xl">
                        <div className="w-full flex justify-center flex-col">
                           
                            <div className="w-full flex-col flex justify-between px-6 mt-4">
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
                                <h1 className="font-sans my-3 text-center w-full font-semibold text-2xl text-black">
                                    Add Contact
                                </h1>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex flex-col items-center w-full  mt-2">
                                    <div className="flex flex-col w-11/12 sm:w-96 mt-3 ">
                                        <p className=" text-md ml-3 mb-1 font-poppins font-bold">
                                            Name*
                                        </p>
                                        <div className="flex  flex-col w-full">
                                            <div
                                                className="flex rounded-lg border-[1px] border-[#253A2D] w-full sm:w-96 bg-white py-1.5 pl-1 items-center">

                                                <input
                                                    onChange={(e) => {
                                                    handleChange(e)
                                                }}
                                                    name='name'
                                                    required
                                                    type="text"
                                                    className="w-11/12 border-none outline-none ml-2"
                                                    placeholder="Enter Name"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-11/12 sm:w-96 flex-col mt-6 lg:mt-0 items-center">
                                        <p className="w-full sm:w-96 text-md ml-3 mb-1 font-poppins font-bold">
                                            Number*
                                        </p>
                                        <div className="flex  flex-col w-full items-center">
                                            <div
                                                className="flex rounded-lg border-[1px] border-[#253A2D] w-full sm:w-96 bg-white  py-1.5 pl-1 items-center">

                                                <input
                                                    onChange={(e) => {
                                                    handleChange(e)
                                                }}
                                                    name="phone"
                                                    required
                                                    type="number"
                                                    className="w-11/12  bo border-none outline-none ml-2"
                                                    placeholder="Enter number"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative w-11/12 sm:w-96 flex flex-col mt-6 lg:mt-0">
                                        <p className="w-full sm:w-96 textclrblack text-md ml-3 mb-1 font-poppins font-bold">
                                            Profession*
                                        </p>

                                        <div
                                            className=" bg-white rounded-lg border-[1px] border-[#253A2D] flex flex-col items-center w-full sm:w-96  justify-between ">
                                            <div className=" w-full h-auto">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                    setProfession(!Profession);
                                                }}
                                                    className=" px-4 py-0.5 border-radius-36  flex justify-between items-center w-full">
                                                    <p
                                                        className=" sticky flex items-center font-open-sans font-semibold text-xs sm:text-base">
                                                        {selectedValues.profession
                                                            ? selectedValues.profession
                                                            : selectedValues[0].profession
                                                                ? selectedValues[0].profession
                                                                : "Select Profession"}
                                                    </p>
                                                    <svg
                                                        className=" sticky width-34-mobile"
                                                        width="42"
                                                        height="42"
                                                        viewBox="0 0 42 42"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="42"
                                                            height="42"
                                                            rx="21"
                                                            transform="matrix(-4.37114e-08 1 1 4.37114e-08 0 0)"
                                                            fill="#76881D"
                                                            fillOpacity="0.1"/>
                                                        <g clipPath="url(#clip0_313:891)">
                                                            <path
                                                                d="M21 25.4204C21.2151 25.4204 21.4301 25.3383 21.5941 25.1744L26.7538 20.0146C27.0821 19.6864 27.0821 19.1542 26.7538 18.8261C26.4257 18.4981 25.8937 18.4981 25.5654 18.8261L21 23.3918L16.4346 18.8263C16.1064 18.4982 15.5744 18.4982 15.2463 18.8263C14.9179 19.1544 14.9179 19.6866 15.2463 20.0148L20.406 25.1746C20.57 25.3385 20.785 25.4204 21 25.4204Z"
                                                                fill="#76881D"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_313:891">
                                                                <rect
                                                                    width="12"
                                                                    height="12"
                                                                    fill="white"
                                                                    transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 27 16)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className={` ${Profession
                                            ? "block"
                                            : "hidden"} px-4 z-10 absolute top-12 mt-10 lg:mt-4 lg:top-16 overflow-auto h-32 rounded-lg bg-[#62BB6A] w-full sm:w-96`}>
                                            <div className="bg-white">
                                                <input
                                                    onChange={(e) => {
                                                    setNewProfession(e.target.value)
                                                }}
                                                    className="bg-white outline-none py-1 px-1"
                                                    type='text'
                                                    placeholder="Enter Profession"/>
                                                <button onClick={AddNewProfession} type="button">Add</button>
                                            </div>
                                            <div>
                                                {professions
                                                    ?.map((value, ind) => (
                                                        <div key={parseInt(ind)}>
                                                            <button
                                                                type="button"
                                                                onClick={() => addPerfession(value, ind)}
                                                                className="w-full text-white text-left font-normal mt-2 text-xs sm:text-base color-gray cursor-pointer">
                                                                {value}

                                                            </button>

                                                            <hr/>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-11/12 sm:w-96 relative flex flex-col mt-6 lg:mt-0">
                                        <p className="w-full sm:w-96 textclrblack text-md ml-3 mb-1 font-poppins font-bold">
                                            Province*
                                        </p>

                                        <div
                                            className=" bg-white rounded-lg border-[1px] border-[#253A2D] flex flex-col items-center w-full sm:w-96  justify-between ">
                                            <div className=" w-full h-auto">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                    setProvince(!Province);
                                                }}
                                                    className=" px-4 py-0.5 border-radius-36  flex justify-between items-center w-full">
                                                    <p
                                                        className=" sticky flex items-center font-open-sans font-semibold text-xs sm:text-base">
                                                        {selectedValues.province
                                                            ? selectedValues.province
                                                            : selectedValues[0].province
                                                                ? selectedValues[0].province
                                                                : "Select Province"}
                                                    </p>
                                                    <svg
                                                        className=" sticky width-34-mobile"
                                                        width="42"
                                                        height="42"
                                                        viewBox="0 0 42 42"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="42"
                                                            height="42"
                                                            rx="21"
                                                            transform="matrix(-4.37114e-08 1 1 4.37114e-08 0 0)"
                                                            fill="#76881D"
                                                            fillOpacity="0.1"/>
                                                        <g clipPath="url(#clip0_313:891)">
                                                            <path
                                                                d="M21 25.4204C21.2151 25.4204 21.4301 25.3383 21.5941 25.1744L26.7538 20.0146C27.0821 19.6864 27.0821 19.1542 26.7538 18.8261C26.4257 18.4981 25.8937 18.4981 25.5654 18.8261L21 23.3918L16.4346 18.8263C16.1064 18.4982 15.5744 18.4982 15.2463 18.8263C14.9179 19.1544 14.9179 19.6866 15.2463 20.0148L20.406 25.1746C20.57 25.3385 20.785 25.4204 21 25.4204Z"
                                                                fill="#76881D"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_313:891">
                                                                <rect
                                                                    width="12"
                                                                    height="12"
                                                                    fill="white"
                                                                    transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 27 16)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className={` ${Province
                                            ? "block"
                                            : "hidden"} px-4 z-10 absolute top-1 mt-20 lg:mt-4 lg:top-16 overflow-auto h-32 rounded-lg bg-[#62BB6A] w-full sm:w-96`}>
                                            {provinceArray.map((value, ind) => (
                                                <div key={parseInt(ind)}>
                                                    <button
                                                        type="button"
                                                        onClick={() => addProvince(value, ind)}
                                                        className="w-full text-left text-white  font-normal mt-2 text-xs sm:text-base color-gray cursor-pointer">
                                                        {value}
                                                    </button>

                                                    <hr/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-11/12 sm:w-96 flex flex-col mt-6 lg:mt-0 relative">
                                        <p className="w-full sm:w-96 textclrblack text-md ml-3 mb-1 font-poppins font-bold">
                                            City*
                                        </p>

                                        <div
                                            className=" bg-white rounded-lg border-[1px] border-[#253A2D] flex flex-col items-center w-full sm:w-96  justify-between ">
                                            <div className=" w-full h-auto">
                                                <div
                                                    className=" px-4 py-0.5 border-radius-36  flex justify-between items-center w-full">
                                                    <input
                                                        value={selectedValues.city
                                                        ? selectedValues.city
                                                        : selectedValues[0].city
                                                            ? selectedValues[0].city
                                                            : matchInput || ''}
                                                        onClick={() => {
                                                        setCities(!cities);
                                                    }}
                                                        onChange={(e) => {
                                                        match(e)
                                                    }}
                                                        type="text"
                                                        className="outline-none sticky flex items-center font-open-sans font-semibold text-xs sm:text-base"
                                                        placeholder={'Select City'}/>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                        setCities(!cities);
                                                    }}>
                                                        <svg
                                                            className=" sticky width-34-mobile"
                                                            width="42"
                                                            height="42"
                                                            viewBox="0 0 42 42"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <rect
                                                                width="42"
                                                                height="42"
                                                                rx="21"
                                                                transform="matrix(-4.37114e-08 1 1 4.37114e-08 0 0)"
                                                                fill="#76881D"
                                                                fillOpacity="0.1"/>
                                                            <g clipPath="url(#clip0_313:891)">
                                                                <path
                                                                    d="M21 25.4204C21.2151 25.4204 21.4301 25.3383 21.5941 25.1744L26.7538 20.0146C27.0821 19.6864 27.0821 19.1542 26.7538 18.8261C26.4257 18.4981 25.8937 18.4981 25.5654 18.8261L21 23.3918L16.4346 18.8263C16.1064 18.4982 15.5744 18.4982 15.2463 18.8263C14.9179 19.1544 14.9179 19.6866 15.2463 20.0148L20.406 25.1746C20.57 25.3385 20.785 25.4204 21 25.4204Z"
                                                                    fill="#76881D"/>
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_313:891">
                                                                    <rect
                                                                        width="12"
                                                                        height="12"
                                                                        fill="white"
                                                                        transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 27 16)"/>
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={` ${cities
                                            ? "block"
                                            : "hidden"} px-4 z-10 absolute top-10 mt-10 lg:mt-4 lg:top-16 overflow-auto h-32 rounded-lg bg-[#62BB6A] w-full sm:w-96`}>
                                            {!matchArray
                                                ? citiesArray
                                                    ?.map((value, ind) => (
                                                        <div key={parseInt(ind)}>
                                                            <button
                                                                type="button"
                                                                onClick={() => addCity(value)}
                                                                className="text-white w-full text-left font-normal mt-2 text-xs sm:text-base color-gray cursor-pointer">
                                                                {value}
                                                            </button>

                                                            <hr/>
                                                        </div>
                                                    ))
                                                    : null}
                                            {matchArray
                                                ?.length > 0
                                                    ? matchArray
                                                        ?.map((value, ind) => (
                                                            <div key={parseInt(ind)}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => addCity(value)}
                                                                    className="font-normal mt-2 text-xs sm:text-base color-gray cursor-pointer">
                                                                    {value}
                                                                </button>

                                                                <hr/>
                                                            </div>
                                                        ))
                                                        : "No Record Found"}
                                        </div>
                                    </div>

                                    <div className="w-11/12 sm:w-96 flex flex-col mt-6 lg:mt-0">
                                        <p className="w-full sm:w-96 textclrblack text-md ml-3 mb-1 font-poppins font-bold">
                                            Address*
                                        </p>
                                        <div
                                            className="flex bg-white justify-between w-full sm:w-96  rounded-lg border-[1px] border-[#253A2D]   pr-1 pl-5 py-1.5 items-center">
                                            <input
                                                onChange={(e) => {
                                                handleChange(e)
                                            }}
                                                name='address'
                                                required
                                                type="text"
                                                className="w-3/4 border-none outline-none ml-2"
                                                placeholder="Enter Address"/>
                                            <button type="button" id="svgdown1"></button>
                                        </div>
                                    </div>

                                    <div className="w-11/12 sm:w-96 flex flex-col mt-6 md:mt-0 ">
                                        <p className="w-full sm:w-96 text-md ml-3 mb-1 font-poppins font-bold">
                                            Add Village*
                                        </p>
                                        <div className="flex  flex-col w-full">
                                            <div
                                                className="relative flex  rounded-lg border-[1px] border-[#253A2D] w-full sm:w-96 bg-white  py-1.5 pl-1 items-center">

                                                <input
                                                    onChange={(e) => {
                                                    matchVillage(e)
                                                }}
                                                    name='village'
                                                    required
                                                    type="text"
                                                    value={village
                                                    ? village
                                                    : ''}
                                                    className="w-3/4 border-none outline-none ml-2"
                                                    placeholder="Add Village"/>
                                                <div
                                                    className={` ${matchVillages
                                                    ? "block"
                                                    : "hidden"} px-4 z-10 absolute top-0 mt-10 lg:mt-4 lg:top-6 overflow-auto h-32 rounded-lg bg-[#62BB6A] w-full sm:w-96`}>
                                                    {matchVillages
                                                        ?.length > 0
                                                            ? matchVillages
                                                                ?.map((value, ind) => (
                                                                    <div key={parseInt(ind)}>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => addVillage(value)}
                                                                            className="w-full text-white text-left font-normal mt-2 text-xs sm:text-base color-gray cursor-pointer">
                                                                            {value}
                                                                        </button>

                                                                        <hr/>
                                                                    </div>
                                                                ))
                                                                : "No Record Found"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-11/12 sm:w-96 relative flex flex-col mt-6 lg:mt-0">
                                        <p className="w-full sm:w-96 textclrblack text-md ml-3 mb-1 font-poppins font-bold">
                                            Relation*
                                        </p>

                                        <div
                                            className=" bg-white  rounded-lg border-[1px] border-[#253A2D]  flex flex-col items-center w-full sm:w-96 justify-between ">
                                            <div className=" w-full h-auto">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                    setRelation(!relation);
                                                }}
                                                    className=" px-4 py-0.5 border-radius-36  flex justify-between items-center w-full">
                                                    <p
                                                        className=" sticky flex items-center font-open-sans font-semibold text-xs sm:text-base">
                                                        {selectedValues.relation
                                                            ? selectedValues.relation
                                                            : selectedValues[0].relation
                                                                ? selectedValues[0].relation
                                                                : "Select Relation"}
                                                    </p>
                                                    <svg
                                                        className=" sticky width-34-mobile"
                                                        width="42"
                                                        height="42"
                                                        viewBox="0 0 42 42"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="42"
                                                            height="42"
                                                            rx="21"
                                                            transform="matrix(-4.37114e-08 1 1 4.37114e-08 0 0)"
                                                            fill="#76881D"
                                                            fillOpacity="0.1"/>
                                                        <g clipPath="url(#clip0_313:891)">
                                                            <path
                                                                d="M21 25.4204C21.2151 25.4204 21.4301 25.3383 21.5941 25.1744L26.7538 20.0146C27.0821 19.6864 27.0821 19.1542 26.7538 18.8261C26.4257 18.4981 25.8937 18.4981 25.5654 18.8261L21 23.3918L16.4346 18.8263C16.1064 18.4982 15.5744 18.4982 15.2463 18.8263C14.9179 19.1544 14.9179 19.6866 15.2463 20.0148L20.406 25.1746C20.57 25.3385 20.785 25.4204 21 25.4204Z"
                                                                fill="#76881D"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_313:891">
                                                                <rect
                                                                    width="12"
                                                                    height="12"
                                                                    fill="white"
                                                                    transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 27 16)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className={` ${relation
                                            ? "block"
                                            : "hidden"} px-4 z-10 absolute top-1 lg:top-16 mt-20 lg:mt-4 overflow-auto h-20 rounded-lg bg-[#62BB6A] w-full sm:w-96`}>
                                            {relationArray.map((value, ind) => (
                                                <div key={parseInt(ind)}>
                                                    <button
                                                        type="button"
                                                        onClick={() => addRelation(value, ind)}
                                                        className="font-normal w-full text-left text-white mt-2 text-xs sm:text-base color-gray cursor-pointer">
                                                        {value}
                                                    </button>

                                                    <hr/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {message && <p className="w-full flex justify-center text-black font-semibold">{message}</p>}
                        <div className="flex w-full justify-center mt-12 mb-8">
                            <button
                                disabled={loadingData || !selectedValues[0]?.village}
                                type="submit"
                                className={`flex justify-center bg-[#62BB6A] text-white w-72 rounded-full py-2 ${!selectedValues[0]?.village? "opacity-25" : null}`}>
                                {loadingData
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
                                    : 'Submit'}

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
   }else{
       return <Loading/>
   }

}

export default AddContacts;
