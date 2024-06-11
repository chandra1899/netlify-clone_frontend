"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const getProjectName = (url: string): string => {
  const projectNameWithGit = url.split('/').pop();
  const projectName = projectNameWithGit ? projectNameWithGit.replace('.git', '') : '';
  return projectName;
}

const DeployForm = () => {
  const {data : session} = useSession()
    const [status, setStatus] = useState("deploy")
    const [repoUrl, setRepoUrl] = useState("")
    const deployRepo = async () => {
      setStatus("uploading...")
      const res = await axios.post("http://localhost:3000/deploy", {
        repoUrl
      })

      const res2 = await axios.post("/createdeployment", {
        email : session?.user?.email,
        deploymentId : res.data.id,
        status : "uploading...",
        githubLink : repoUrl,
        deploymentLink : `${res.data.id}.example.com/index.html`,
        deploymentname : getProjectName(repoUrl)
      })
      // console.log(res);
      const interval = setInterval(async () => {
        const statusRes = await axios.get(`http://localhost:3000/status?id=${res.data.id}`)
        setStatus(statusRes.data.status)
        if(statusRes.data.status == "deployed"){
          setRepoUrl("")
          clearInterval(interval)
        }
      }, 1500)
    }
  return (
    <div className='border-2 border-slate-400 rounded-2xl p-4 w-[36vw] flex flex-col items-center justify-center'>
      <input 
        type="text" 
        placeholder='https://github.com/username/example.git'
        className='h-[38px] w-[80%] border-none border-2 border-white rounded-lg my-3 focus:border-blue-500 p-3 text-black'
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
