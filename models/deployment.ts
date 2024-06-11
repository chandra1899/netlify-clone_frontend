import mongoose ,{Schema, models} from 'mongoose'

const deploymentSchema=new Schema({
    email:{
        type:String,
        unique:true,
        required:true
        },
    deploymentname:{
        type:String,
        required:true
        },
    deploymentId : {
        type : String,
        unique: true,
        required : true
    },
    status : {
        type : String,
        enum : ["error", "uploading...", "uploaded", "building...", "build", "deploying...", "deployed"]
    },
    githubLink : {
        type : String,
        unique: true,
        required : true
    },
    deploymentLink : {
        type : String,
    }
},{timestamps:true})

const Deployment = models?.Deployment || mongoose.model('Deployment',deploymentSchema)
export default Deployment