// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')

router.get('/:task_id', (req, res, next) => {
    Task.gettaskById(req.params.task_id)
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(next)
})



router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside task router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router