"use client"
import React, { useState } from 'react'
import Image from "next/image";

const PrevDeploy = () => {
  const [redeploying, setRedeploying] = useState(false)
  const [status, setStatus] = useState("deployed")
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
            <p>id : </p>
            <p className='bg-slate-800 p-1 px-2 text-[0.9rem] text-violet-500 rounded-lg ml-1'> 45sdf2</p>
        </div>
        <div className='flex flex-row justify-center items-center'>
            <p>status : </p>
            <p className={`bg-slate-800 p-1 px-2 ${status == 'deployed'? 'text-green-500 ':'text-yellow-400'} text-[0.9rem] rounded-lg ml-1`}> {status}</p>
        </div>
        {redeploying ? 
      <Image
      height={25}
      width={25}
      src={"/refresh_gif.gif"}
      alt='refresh'
      className='cursor-not-allowed rounded-full p-1'
      />:
      <Image
        height={25}
        width={25}
        src={"/refresh.png"}
        alt='refresh'
        className='cursor-pointer rounded-full hover:bg-slate-800 p-1'
        onClick={() => setRedeploying(true)}
      />
        }
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
