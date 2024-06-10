import React from 'react'
import Image from "next/image";

const PrevDeploy = () => {
  return (
    <div className='flex flex-row justify-between items-center p-2 m-4 w-[40vw]'>
      <div className='flex flex-row justify-center items-center'>
      <Image
        height={25}
        width={25}
        src={"/openlink.png"}
        alt='openLink'
        className='cursor-pointer '
      />
        <p className='mx-3  font-medium'>socialDraft</p>
      </div>
        <div className='flex flex-row justify-center items-center'>
            <p>status : </p>
            <p className='bg-slate-800 p-1 px-2 text-[0.9rem] text-green-500 rounded-lg ml-1'> deployed</p>
        </div>
      <Image
        height={25}
        width={25}
        src={"/refresh.png"}
        alt='refresh'
        className='cursor-pointer rounded-full hover:bg-slate-800 p-1'
      />
      <Image
        height={30}
        width={30}
        src={"/dots.png"}
        alt='dots'
        className='cursor-pointer rounded-full hover:bg-slate-800 p-1'
      />
    </div>
  )
}

export default PrevDeploy
