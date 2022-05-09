import React, {useState} from 'react'
import {firestore, auth, fire, firebaseApp} from "../config/fire-config";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useCollection, doc, getDoc, setDoc} from 'react-firebase-hooks/firestore';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {login} from '../public/login.png'
import Footer from '../components/footer';
const Login = () => {
    const router = useRouter();
    const [userData,
        setUserData] = useState({username: '', password: ''})
    const [passwordType,
        setPasswordType] = useState("password")
    const [loading,
        setLoading] = useState(false)
    const [error,
        setError] = useState('')
    const HandleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }
    const handleLogin = async(event) => {
        setError("")
        setLoading(true)
        console.log(userData.username, userData.password)
        event.preventDefault();
        await signInWithEmailAndPassword(auth, userData.username.toLocaleLowerCase(), userData.password).then(() => {
            router.push('/allcontacts')
            setLoading(false);
        }).catch(() => {
            setError('Invalid Email or Password');
            setTimeout(() => {
                setError("")
            }, 3000);
            setLoading(false);
        });

        setLoading(false);
    }
    return (
        <div className="w-full min-h-screen bgcolor flex justify-center items-center ">
            <div className="justify-center bg-white rounded-xl w-[538px] flex">
                <div className="w-full justify-center items-center flex blurs h-full">
                    <form
                        onSubmit={handleLogin}
                        className="w-[500px] flex justify-center  blurbg flex-col  rounded-2xl">
                        <div className="w-full flex justify-center flex-col">
                            <div className="w-full flex items-center mt-8">
                                <h1 className="font-sans font-bold text-3xl text-black">
                                    Login</h1>
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <div className='w-[200px] h-[200px] relative'>
                                    <Image className='absolute' src='/login.png' layout="fill"/>
                                </div>
                            </div>
                            <div className="flex flex-col w-full mt-2">
                                <div className="flex flex-col items-center w-full lg:justify-evenly mt-2">
                                    <div className="flex flex-col w-72 mt-3 lg:w-80">

                                        <div
                                            className="flex rounded-xl border-2 border-gray-600 w-72 lg:w-80 h-10 bg-white py-3 pl-1 items-center">

                                            <input
                                                onChange={(e) => {
                                                HandleChange(e)
                                            }}
                                                required
                                                name="username"
                                                type="email"
                                                className="w-3/4 border-none outline-none ml-2"
                                                placeholder="Enter Name"/>
                                        </div>

                                    </div>
                                    <div className="flex flex-col mt-6 w-72 lg:w-80">

                                        <div
                                            className="flex justify-between rounded-xl w-72 lg:w-80  h-10 bg-white py-3 pl-1 items-center border-2 border-gray-600">

                                            <input
                                                onChange={(e) => {
                                                HandleChange(e)
                                            }}
                                                required
                                                name='password'
                                                type={passwordType}
                                                className="w-4/5 outline-none  ml-2"
                                                placeholder="Enter Password"/>
                                            <button
                                                type='button'
                                                onClick={() => {
                                                passwordType === 'password'
                                                    ? setPasswordType("text")
                                                    : setPasswordType('password')
                                            }}
                                                className="mr-3">
                                                <svg
                                                    className=''
                                                    width="21"
                                                    height="14"
                                                    viewBox="0 0 21 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M20.2119 6.80353C20.2119 6.80353 16.5559 0.103516 10.4619 0.103516C4.36791 0.103516 0.711914 6.80353 0.711914 6.80353C0.711914 6.80353 4.36791 13.5035 10.4619 13.5035C16.5559 13.5035 20.2119 6.80353 20.2119 6.80353ZM2.14191 6.80353C2.73115 7.69918 3.4089 8.53336 4.16492 9.29352C4.92641 10.2297 5.88696 10.9844 6.97675 11.5027C8.06653 12.0211 9.25813 12.29 10.4649 12.29C11.6717 12.29 12.8633 12.0211 13.9531 11.5027C15.0428 10.9844 16.0034 10.2297 16.7649 9.29352C17.5209 8.53333 18.1986 7.69915 18.7879 6.80353C18.1986 5.9079 17.5209 5.07369 16.7649 4.31351C16.0033 3.3775 15.0427 2.62296 13.9529 2.10474C12.8632 1.58651 11.6716 1.31763 10.4649 1.31763C9.25819 1.31763 8.06667 1.58651 6.9769 2.10474C5.88713 2.62296 4.92652 3.3775 4.16492 4.31351C3.40918 5.07392 2.73146 5.9081 2.14191 6.80353Z"
                                                        fill="#5F5E5E"/>
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M10.4613 3.76105C9.75691 3.76145 9.07444 4.00603 8.53015 4.45316C7.98586 4.90029 7.61343 5.52229 7.47629 6.2132C7.33915 6.90412 7.44579 7.6212 7.77805 8.24232C8.1103 8.86343 8.64762 9.35015 9.29846 9.61954C9.9493 9.88894 10.6734 9.92435 11.3474 9.71976C12.0215 9.51517 12.6037 9.08322 12.995 8.4975C13.3863 7.91179 13.5624 7.20855 13.4934 6.50754C13.4243 5.80654 13.1144 5.15117 12.6163 4.65305C12.0445 4.08196 11.2694 3.76115 10.4613 3.76105V3.76105ZM6.19531 6.80805C6.1953 5.82106 6.53755 4.86458 7.1637 4.10163C7.78985 3.33868 8.66115 2.81646 9.62918 2.62394C10.5972 2.43142 11.6021 2.58053 12.4725 3.04584C13.3429 3.51116 14.0251 4.2639 14.4027 5.17579C14.7803 6.08768 14.8301 7.10229 14.5435 8.04676C14.2569 8.99122 13.6517 9.80708 12.831 10.3553C12.0102 10.9036 11.0248 11.1503 10.0426 11.0534C9.06035 10.9565 8.1421 10.5221 7.44431 9.82404C6.64531 9.02373 6.19677 7.93893 6.1973 6.80805H6.19531Z"
                                                        fill="#5F5E5E"/>
                                                </svg>

                                            </button>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <p className='w-full flex justify-center text-lg font-semibold text-black'>{error && error}</p>
                        <div className=" flex w-full justify-center mt-12 mb-12 ">
                            <button
                                disabled={loading}
                                type="submit"
                                className="flex justify-center items-center opacity-80 hover:opacity-100 font-semibold text-white w-72 rounded-xl py-2 bg-[#62BB6A]">
                                {loading
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
                                    : 'Log In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login