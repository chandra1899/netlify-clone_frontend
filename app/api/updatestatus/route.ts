import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Deployment from '@/models/deployment'

export async function POST(req:Request){
    try {
        const {deploymentId, status}=await req.json()
        // console.log(email, deploymentId, status, githubLink, deploymentLink, deploymentname)
        await connectMongoDB()
        await Deployment.findOneAndUpdate({deploymentId},{status})
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log('error in updating deployment',error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}