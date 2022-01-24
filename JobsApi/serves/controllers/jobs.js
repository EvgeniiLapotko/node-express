const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
require('dotenv').config()
const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId})
    res.status(StatusCodes.OK).json({jobs})
}

const getJob = async(req, res) => {
    const {id} = req.params
    const {userId} = req.user

    const job = await Job.findOne({_id: id, createdBy: userId})
    if(!job){
        throw new BadRequestError(`No job with id ${id}`)
    }

    res.status(StatusCodes.OK).json({job})
}
const createJob = async (req, res) => {
    const {company, position} =  req.body
    if(!company || !position){
        throw new BadRequestError('Please proved company name and position')
    }
    const {userId} = req.user
    const job = await Job.create({company, position, createdBy:userId})

    res.status(StatusCodes.CREATED).json({job})
}
const updateJob = async (req, res) => {
    const {id} = req.params
    const {userId} = req.user

    const job = await Job.findOneAndUpdate({_id: id, createdBy: userId}, req.body, {new: true, runValidators: true})
    if(!job){
        throw new BadRequestError(`No job with id ${id}`)
    }

    res.status(StatusCodes.OK).json({job})
}
const deleteJob = async (req, res) => {
    const {id} = req.params
    const {userId} = req.user

    const job = await Job.findOneAndDelete({_id: id, createdBy: userId})
    if(!job){
        throw new BadRequestError(`No job with id ${id}`)
    }

    res.status(StatusCodes.OK).json({job})
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
