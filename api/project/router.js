// build your `/api/projects` router here
const router = require('express').Router()
const Project = require('./model')


router.get('/', async (req,res,next) => {
    try {

    const proj = await Project.getProjects()
    res.json(proj)
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const createProject = await Project.createProject(req.body)
        if(createProject.project_completed === 0) {
            res.status(201).json({
                project_id: createProject.project_id,
                project_name: createProject.project_name,
                project_description: createProject.project_description,
                project_completed: false
            })
        } else {
            res.status(201).json({
                project_id: createProject.project_id,
                project_name: createProject.project_name,
                project_description: createProject.project_description,
                project_completed: true 
            })
        }

    }catch(err) {
        next(err)
    }
})

module.exports = router