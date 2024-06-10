import React from 'react'
import Image from "next/image";
import { signOut } from 'next-auth/react';

const Header = ({session} : any) => {
    console.log(session);
    
  return (
    <div className='flex flex-row justify-between items-center  w-[100vw] top-4 z-[1] fixed'>
      <div className='flex justify-center items-center flex-row'>
        <Image
            height={50}
            width={50}
            src={session?.user?.image}
            alt='Image'
            className='rounded-full ml-6'
        />
        <p className='mx-3 font-medium text-[20px]'>{session?.user?.name}</p>
      </div>
    <button 
    onClick={() => signOut()}
    className='h-[100%] p-2 bg-red-600 rounded-lg mx-4'
    >Sign out</button>
    </div>
  )
}

export default Header
