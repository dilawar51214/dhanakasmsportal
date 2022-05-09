import React, {useState} from "react";
import Link from 'next/dist/client/link';
import Delete from "./Delete";
const Details = (props) => {
    const {id, value, hide, deleteUser, index} = props;
    const [conformDelete,
        setConformDelete] = useState(false)
    const [deleteRecord,
        setDeleteRecord] = useState(false)
    const DeleteUser = () => {
        //
        setConformDelete(true)
        // hide(false)

    }
    if (deleteRecord) {
        deleteUser(index)
        hide(false)
    }
    return ( <> {
        conformDelete
            ? <Delete
                    uid={id}
                    deleteUser={setConformDelete}
                    setDeleteRecord={setDeleteRecord}/>
            : null
    } < div className = {
        `absolute w-10/12 sm:w-[490px] 2xl:w-[600px]  justify-center items-center`
    } > <div
        className="w-[100%] justify-center items-center bg-white shadow-lg border-[1px] rounded-md border-gray-200 flex">
        <div className="w-full justify-center items-center flex blurs">
            <div className="w-full flex justify-center items-center  blurbg flex-col">
                <div className="w-full flex justify-center flex-col lg:items-center">
                    <div className="w-full flex  justify-center items-center mt-8 lg:mt-6">
                        <h1
                            className="w-11/12 flex justify-center font-sans font-bold text-3xl text-black">
                            {value.name}
                        </h1>
                        <button
                            type="button"
                            onClick={() => {
                            hide(false)
                        }}
                            className=" flex justify-end pr-6 font-bold text-xl text-black">
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

                    </div>
                    <div className="flex w-full flex-col items-center">
                        <div className="px-6 flex-col flex w-full lg:justify-between">
                            <div className="flex justify-between w-full items-center mt-3">

                                <p className="text-black font-bold text-xl">Number</p>
                                <p className="ml-4 text-sm pl-1 font-semibold text-black lg:text-lg">
                                    {value.phone}
                                </p>

                            </div>

                            <div className="flex justify-between w-full items-center mt-2">

                                <p className="text-black font-bold text-xl">Profession</p>
                                <p className="ml-4 text-sm pl-1 font-semibold text-black lg:text-lg">
                                    {value.profession}
                                </p>

                            </div>
                            <div className="flex justify-between w-full items-center mt-2">

                                <p className="text-black font-bold text-xl">City</p>
                                <p className="ml-4 text-sm pl-1 font-semibold text-black lg:text-lg">
                                    {value.city}
                                </p>

                            </div>
                            <div className="flex justify-between w-full items-center mt-2">

                                <p className="text-black font-bold text-xl">Address</p>
                                <p className="ml-4 text-sm pl-1 font-semibold text-black lg:text-lg">
                                    {value.address}
                                </p>

                            </div>
                        </div>

                    </div>
                    <div className=" justify-between flex items-center my-8">
                        <Link href={`user/${id}`}>
                            <button
                                type="button"
                                className=" bg-[#62BB6A] hover:opacity-100 opacity-90 text-white w-[150px] h-11 rounded-md text-sm lg:text-xl  ">
                                Edit
                            </button>
                        </Link>
                        <button
                            onClick={DeleteUser}
                            type="button"
                            className="bg-[#62BB6A] ml-6 text-white opacity-40 hover:opacity-70 w-[150px] h-11 rounded-md  text-sm lg:text-xl  ">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div> </div>
    </> );
};

export default Details;
