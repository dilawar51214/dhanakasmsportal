import React from 'react'
import {firestore, fire} from '../config/fire-config';
import {
    doc,
    deleteDoc,
} from 'firebase/firestore';
const Delete = (props) => {
    const {uid,deleteUser,setDeleteRecord} = props;
     const Delete = async()=>{
        await deleteDoc(doc(firestore, 'users', uid)).then(()=>{
            setDeleteRecord(true);
            deleteUser(false)
        })
        
     }
  return ( <div id="popup-modal" tabIndex="-1" className="flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full mt-20 sm:mt-16">
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
      
        <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
            
            <div className="flex justify-end p-2">
                <button onClick={()=>deleteUser(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                </button>
            </div>
           
            <div className="w-full p-6 pt-0 text-center">
                <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete the Record?</h3>
                <button onClick={Delete} data-modal-toggle="popup-modal" type="button" className="bg-[#62BB6A] hover:opacity-100 opacity-90 text-white w-[140px] h-11 rounded-md text-sm lg:text-xl">
                    Yes
                </button>
                <button onClick={()=>deleteUser(false)} type="button" className="sm:ml-4 bg-[#62BB6A] hover:opacity-100 opacity-90 text-white w-[140px] h-11 rounded-md text-sm lg:text-xl">No</button>
            </div>
        </div>
    </div>
</div>
   
  )
}

export default Delete