"use client"
import React, { useEffect, useState } from 'react'
import PrevDeploy from './PrevDeploy'
import { useSession } from 'next-auth/react'

const PrevDeploys = () => {
  const {data : session, status} = useSession()
  const [deployments, setDeployments] = useState([])
  const getdeployments = async() => {
    let res = await fetch('/api/getdeployments',{
        method:'POST',
        headers:{
          'Access-Control-Allow-Origin': '*',
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify({
          userEmail : session?.user?.email
        })
      }) 
      if(res.status === 200){
          let data = await res.json()
          // console.log(data.deployments);
          
          if(data.deployments){
            setDeployments(data.deployments)
          }
      }
    }
  useEffect(()=>{
    getdeployments()
  }, [status, session])
  return (
    <div className='mt-7'>
      {deployments && deployments.map((deployment) => {
        return <PrevDeploy deployment = {deployment} />
      })}
    </div>
  )
}

export default PrevDeploys
