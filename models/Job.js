const { required } = require('joi')
const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
    {
        company : 
        {
            type : String,
            required : [true, "Please Provide Company Name"],
            maxLength : 30
        },

        position : 
        {
            type : String,
            required : [true, "Please provide position"],
            maxLength : 50
        },

        status : 
        {
            type : String,
            enum : ['interview', 'declined', 'pending'],
            default : 'pending',
        },

        createdBy : 
        {
            type : mongoose.Types.ObjectId,
            ref : 'Users',
            required : [true, "Please provide user"]
        }
    },
    {
        timestamps : true
    })


module.exports = mongoose.model('Jobs', jobSchema)