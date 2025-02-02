const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const ProjectSchema = new Schema({
    title:{type:String},
    description:{type:String},
    studentId:{type:Schema.Types.ObjectId,ref:"user"},
    status:{type:String}

})

const Project = mongoose.model("project",ProjectSchema);
module.exports = Project;