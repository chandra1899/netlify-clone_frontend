import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Deployment from '@/models/deployment'

export async function POST(req:Request){
    try {
        const {deploymentId}=await req.json()
        // console.log(email, deploymentId, status, githubLink, deploymentLink, deploymentname)
        await connectMongoDB()
        let deployment = await Deployment.findOne({deploymentId})
        
        return NextResponse.json({repoUrl : deployment.repoUrl})
    } catch (error) {
        console.log('error in updating deployment',error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}