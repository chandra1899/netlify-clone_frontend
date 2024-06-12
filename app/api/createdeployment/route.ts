import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Deployment from '@/models/deployment'

export async function POST(req:Request){
    try {
        // console.log('hi');
        
        const {email, deploymentId, status, githubLink, deploymentLink, deploymentname}=await req.json()
        // console.log(email, deploymentId, status, githubLink, deploymentLink, deploymentname)
        await connectMongoDB()
        let deploy = await Deployment.create({userEmail : email, deploymentId, status, repoUrl : githubLink, deploymentLink, deploymentname})
        // console.log("deploy", deploy);
        
        return NextResponse.json({},{status:200})
    } catch (error) {
        console.log('error in creating deployment',error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}