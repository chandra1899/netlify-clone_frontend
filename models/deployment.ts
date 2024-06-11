import mongoose ,{Schema, models} from 'mongoose'

const deploymentSchema=new Schema({
    userEmail:{
        type:String,
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
        enum : ["error", "uploading", "uploaded", "building", "build", "deploying", "deployed"]
    },
    repoUrl : {
        type : String,
        required : true
    },
    deploymentLink : {
        type : String,
    }
},{timestamps:true})

const Deployment = models?.Deployment || mongoose.model('Deployment',deploymentSchema)
export default Deployment