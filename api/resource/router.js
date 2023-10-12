// build your `/api/resources` router here
const router = require('express').Router()
const Resource = require('./model')

router.get('/:resource_id', (req, res, next) => {
    Resource.getresourceById(req.params.resource_id)
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(next)
})



router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside resource router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router