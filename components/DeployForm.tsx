"use client"
import React, { useState } from 'react'

const DeployForm = () => {
    const [status, setStatus] = useState("deploy")
  return (
    <div className='border-2 border-slate-400 rounded-2xl p-4 w-[36vw] flex flex-col items-center justify-center'>
      <input 
        type="text" 
        placeholder='https://github.com/username/example.git'
        className='h-[38px] w-[80%] border-none border-2 border-white rounded-lg my-3 focus:border-blue-500 p-3 text-black'
      />
      <button
        className={`h-[38px] w-[80%] ${status==='deploy'?'bg-blue-700 ':''} ${status==='uploading...'?'bg-blue-800 ':''} ${status==='deploying...' || status==='uploaded'?'bg-yellow-600 ':''} ${status==='deployed'?'bg-green-700':''} hover:bg-blue-800 rounded-lg my-3 p-3 flex justify-center items-center font-medium`}
      >{status}</button>
      {status === "deployed" && <div className='px-3 py-1 border-2 border-slate-500 cursor-pointer rounded-lg hover:bg-slate-900 my-2'>
        <p>Copy Link</p>
      </div>}
    </div>
  )
}

export default DeployForm
