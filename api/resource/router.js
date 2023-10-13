// build your `/api/resources` router here
const router = require('express').Router()
const Resource = require('./model')

router.get('/', (req, res, next) => {
   Resource.getResources()
   .then(resources => {
    res.json(resources)
   })
   .catch(next)
})

router.post('/', async (req, res, next) => {
    try {
        const createRes = await Resource.createResource(req.body)
        res.status(201).json(createRes)
    } catch(err) {
        next(err)
    }
})

module.exports = router