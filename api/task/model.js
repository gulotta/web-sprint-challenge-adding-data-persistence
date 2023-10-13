// build your `Task` model here
const db = require('../../data/dbConfig')

async function getTasks() {
    const task = await db('tasks as t')
    .join('projects as p', 'p.project_id', 't.project_id')
    .select('p.*', 't.*')

    const taskResult = task.map(tr => {
        if (tr.task_completed === 0) {
            return {
                task_id: tr.task_id,
                task_description: tr.task_description,
                task_notes: tr.task_notes,
                task_completed: false,
                project_name: tr.project_name,
                project_description: tr.project_description,
            }
        } else {
            return {
                task_id: tr.task_id,
                task_description: tr.task_description,
                task_notes: tr.task_notes,
                task_completed: true,
                project_name: tr.project_name,
                project_description: tr.project_description,
            }
        }
    })

    return taskResult
}

async function createTask(task) {
    const [task_id] = await db('tasks').insert(task)
    const t = await db('tasks').where('task_id', task_id).first()

    if (t.task_completed === 0) {
        return {
                task_id: t.task_id,
                task_description: t.task_description,
                task_notes: t.task_notes,
                task_completed: false,
                project_name: t.project_name,
                project_description: t.project_description,
            }
                } else {
        return {
                task_id: t.task_id,
                task_description: t.task_description,
                task_notes: t.task_notes,
                task_completed: true,
                project_name: t.project_name,
                project_description: t.project_description,
            }
        }

}


module.exports = {

    getTasks,
    createTask

}