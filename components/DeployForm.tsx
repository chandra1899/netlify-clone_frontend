"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'



const DeployForm = () => {
  const {data : session} = useSession()
    const [status, setStatus] = useState("deploy")
    const [repoUrl, setRepoUrl] = useState("")
    const [blur, setBlur] = useState(false)
    const deployRepo = async () => {
      setBlur(true)
      setStatus("uploading...")
      const res = await axios.post("http://localhost:3000/deploy", {
        repoUrl,
        email : session?.user?.email
      })
      
      // console.log(res);
      const interval = setInterval(async () => {
        const statusRes = await axios.get(`http://localhost:3000/status?id=${res.data.id}`)
        setStatus(statusRes.data.status)
        if(statusRes.data.status == "deployed"){
          setRepoUrl("")
          setBlur(false)
          clearInterval(interval)
        }
      }, 1500)
    }
  return (
    <div className='border-2 border-[#4E3636] rounded-2xl p-4 w-[42vw] flex flex-col items-center justify-center relative'>
      {blur && <div
        className='absolute h-[94%] w-[99%] z[1] cursor-not-allowed rounded-2xl opacity-40 bg-slate-900'
      ></div>}
      <input 
        type="text" 
        placeholder='https://github.com/username/example.git'
        className=' border-slate-500 focus:bg-black border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 h-[38px] w-[80%] focus:border-blue-500 focus:border-2 rounded-lg my-3  p-3 outline-none font-medium bg-[#17191d] placeholder:text-secondary'
        value={repoUrl}
        onChange={e => {setRepoUrl(e.target.value);setStatus("deploy")}}
      />
      <button
        className={`h-[38px] w-[80%] ${status==='deploy'?'bg-blue-700 ':''} ${status==='uploading...'?'bg-blue-800 ':''} ${status==='building...' ||status==='deploying...' || status==='uploaded...'?'bg-yellow-600 ':''} ${status==='deployed'?'bg-green-700':''} hover:bg-blue-800 rounded-lg my-3 p-3 flex justify-center items-center font-medium`}
        onClick={deployRepo}
      >{status}</button>
      {status === "deployed" && <div className='px-3 py-1 border-2 border-slate-500 cursor-pointer rounded-lg hover:bg-slate-900 my-2'>
        <p>Copy Link</p>
      </div>}
    </div>
  )
}

export default DeployForm
