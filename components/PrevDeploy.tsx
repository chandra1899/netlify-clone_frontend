"use client"
import React, { useState } from 'react'
import Image from "next/image";
import axios from 'axios';

const PrevDeploy = ({deployment} : any) => {
  const [redeploying, setRedeploying] = useState(false)
  const [status, setStatus] = useState(deployment.status)
  const redeploy =async () => {
    setStatus("waiting...")
    setRedeploying(true)
    await axios.post("http://localhost:3000/redeploy",{
      id : deployment.deploymentId
    })

    const interval = setInterval(async () => {
      const statusRes = await axios.get(`http://localhost:3000/status?id=${deployment.deploymentId}`)
      setStatus(statusRes.data.status)
      if(statusRes.data.status == "deployed" || statusRes.data.status == "error"){
        setRedeploying(false)
        clearInterval(interval)
      }
    }, 1500)
  }
  return (
    <div className='flex flex-row justify-between items-center p-2 m-4 w-[50vw]'>
      <div className='flex flex-row justify-center items-center'>
      <Image
        height={25}
        width={25}
        src={"/openlink.png"}
        alt='openLink'
        className='cursor-pointer '
        onClick={() => window.open(deployment.deploymentLink, '_blank')}
      />
        <p className='mx-3  font-medium'>{deployment.deploymentname}</p>
      </div>
        <div className='flex flex-row justify-center items-center'>
            <p>id : </p>
            <p className='bg-slate-800 p-1 px-2 text-[0.9rem] text-violet-500 rounded-lg ml-1'> {deployment.deploymentId}</p>
        </div>
        <div className='flex flex-row justify-center items-center'>
            <p>status : </p>
            <p className={`bg-slate-800 p-1 px-2 ${status == 'deployed'? 'text-green-500 ':status == 'error'?'text-red-600':'text-yellow-400'} text-[0.9rem] rounded-lg ml-1`}> {status}</p>
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
        onClick={() => redeploy()}
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
