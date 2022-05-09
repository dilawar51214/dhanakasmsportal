import React from 'react'
import Link from 'next/link';
const AddContact = () => {
    return (  
        <div className='w-full flex justify-end items-center'>
            <Link href="/addcontacts" passHref>  
                <svg     
                    className='cursor-pointer'
                    width="73"
                    height="72"
                    viewBox="0 0 73 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_17_738)">
                        <path
                            d="M50.4836 3.95215H22.3906C13.5541 3.95215 6.39062 11.1156 6.39062 19.9521V46.3281C6.39062 55.1647 13.5541 62.3281 22.3906 62.3281H50.4836C59.3202 62.3281 66.4836 55.1647 66.4836 46.3281V19.9521C66.4836 11.1156 59.3202 3.95215 50.4836 3.95215Z"
                            fill="#62BB6A"/>
                    </g>
                    <path
                        d="M52.9427 31.9363V34.5113H37.4927V49.9603H34.9178V34.5113H19.4688V31.9363H34.9178V16.4873H37.4927V31.9363H52.9427Z"
                        fill="white"/>
                    <defs>
                        <filter
                            id="filter0_d_17_738"
                            x="0.390625"
                            y="0.952148"
                            width="72.0938"
                            height="70.376"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"/>
                            <feOffset dy="3"/>
                            <feGaussianBlur stdDeviation="3"/>
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.384314 0 0 0 0 0.733333 0 0 0 0 0.415686 0 0 0 0.388 0"/>
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_17_738"/>
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_17_738"
                                result="shape"/>
                        </filter>
                    </defs>
                </svg>
            </Link>

        </div>
    )
}

export default AddContact