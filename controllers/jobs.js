const Jobs = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllJobs = async (req, res) =>
    {
        const job = await Jobs.find({ createdBy : req.user.userId}).sort('createdAt')
        console.log(req.user.userId);
        res.status(StatusCodes.OK).json({job, count : job.length})
    }


    
const getJob = async (req, res) =>
{
    const { user : { userId }, params : {id : jobId} } = req
    // const  user = req.user.userId
    // const  params = req.params.id
    const job = await Jobs.findOne({_id : jobId, createdBy : userId})
    if(!job)
    {
        throw new NotFoundError(`no job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })

}

const createJob = async (req, res) =>
{
    req.body.createdBy = req.user.userId
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json( job )
}

const updateJob = async (req, res) =>
{
    const { body : { company, position}, user : { userId}, params : { id : jobId}} = req
    // console.log(company);
    if (company === '' || position === '')
    {
        throw new BadRequestError("company or position cannot be empty")
    }

    const job = await Jobs.findByIdAndUpdate({_id : jobId, createdBy : userId}, req.body, {new:true, runValidators:true})
    if (!job)
    {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}   

const deleteJob = async (req, res) =>
    {
        const { user : { userId }, params : {id : jobId} } = req
        const job = await Jobs.findByIdAndDelete({_id : jobId, createdBy : userId})
        if (!job)
            {
                throw new NotFoundError(`No job with id ${jobId}`)
            }

            res.status(StatusCodes.OK).json({})

    }


module.exports = 
{
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,

}