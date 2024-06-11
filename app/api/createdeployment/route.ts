import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Deployment from '@/models/deployment'

export async function POST(req:Request){
    try {
        const {email, deploymentId, status, githubLink, deploymentLink, deploymentname}=await req.json()
        console.log(email, deploymentId, status, githubLink, deploymentLink, deploymentname)
        await connectMongoDB()
        await Deployment.create({email, deploymentId, status, githubLink, deploymentLink, deploymentname})
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log('error in creating deployment',error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}