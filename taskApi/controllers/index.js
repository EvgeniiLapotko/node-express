const Task = require('../models/Task')

const controllersAll = {
    getAllItem: async (req, res, next) => {

        try{
            const tasks = await Task.find({})
            res.status(201).json({tasks})
        }catch (e) {
            res.status(500).json({msg: e})
        }

    },
    createItem: async (req ,res) => {
        try{
            const task = await Task.create(req.body)

            res.status(201).json({task})
        }catch (e) {
            res.status(500).json({msg: e})
        }

    },
    getTask: async (req, res, next) => {
        try{
            const task = await Task.findOne({_id: req.params.id})
            if(!task){
                return res.status(404).json({msg: 'No task'})
            }
            res.status(201).json({task})
        }catch (e) {
            res.status(500).json({msg: e})
        }
    },
    updateTask: async (req, res) => {
        try{
            const task = await Task.findOneAndUpdate({_id: req.params.id}, req.body, {
                new: true,
                runValidators: true
            })
            if(!task){
                return res.status(404).json({msg: 'No task'})
            }
            res.status(200).json({task})
        }catch (e) {
            res.status(500).json({msg: e})
        }
    },
    deleteTask: async (req, res) => {
        try{
            const task = await Task.findOneAndDelete({_id: req.params.id})
            if(!task){
                return res.status(404).json({msg: 'No task'})
            }
            res.status(201).json({task})
        }catch (e) {
            res.status(500).json({msg: e})
        }
    },
}


module.exports = controllersAll
