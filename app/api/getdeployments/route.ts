import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Deployment from '@/models/deployment'

export async function POST(req:Request){
    try {
        const {userEmail}=await req.json()
        // console.log(email, deploymentId, status, githubLink, deploymentLink, deploymentname)
        await connectMongoDB()
        let deployments = await Deployment.find({userEmail})
        
        return NextResponse.json({deployments})
    } catch (error) {
        console.log('error in updating deployment',error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}