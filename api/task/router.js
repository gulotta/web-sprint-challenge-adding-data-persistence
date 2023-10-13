// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')

router.get('/', async (req, res, next) => {
   try {
    const getTask = await Task.getTasks()
    res.json(getTask)
   } catch(err) {
    next(err)
   }
})

router.post('/', async (req, res, next) => {
    try {
        const newTask = await Task.createTask(req.body)
        res.status(201).json(newTask)

    } catch(err) {
        next(err)
    }
})

module.exports = router