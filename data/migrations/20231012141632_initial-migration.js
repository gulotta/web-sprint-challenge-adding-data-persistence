
exports.up = async function(knex) {
  await knex.schema

.createTable('projects', projectTbl => {
    projectTbl.increments('project_id')
    projectTbl.string('project_name', 128).notNullable()
    projectTbl.string('project_description', 500)
    projectTbl.boolean('project_completed').default(false) 
})    
.createTable('resources', resourceTbl => {

    resourceTbl.increments('resource_id')   
    resourceTbl.string('resource_name', 128).notNullable().unique    
    resourceTbl.string('resource_description', 500)

})
.createTable('tasks', taskTbl => {

    taskTbl.increments('task_id')
    taskTbl.string('task_description').notNullable()    
    taskTbl.string('task_notes')
    taskTbl.boolean('task_completed').default(false)    
    taskTbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
})

};

exports.down = function(knex) {
  
};
