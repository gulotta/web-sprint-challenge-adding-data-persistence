// build your `Project` model here
const db = require('../../data/dbConfig.js')

async function getProjects() {
    const projects = await db('projects')
   
    const result = projects.map(project => {
        if(project.project_completed === 0) {
            return {
                project_id: project.project_id,
                project_name: project.project_name,
                project_description: project.project_description,
                project_completed: false
            }
        } else {
            return {
                project_id: project.project_id,
                project_name: project.project_name,
                project_description: project.project_description,
                project_completed: true
            }
        }
    })
    return result
}

async function createProject(project) {
    const [project_id] = await db('projects').insert(project)
    return db('projects').where('project_id', project_id).first()
}

module.exports = {

    createProject,
    getProjects

}