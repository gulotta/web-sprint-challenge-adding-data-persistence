
exports.up = async function(knex) {
  await knex.schema

    .createTableIfNotExists('projects', (projectTbl) => {

        projectTbl.increments('project_id')
        projectTbl.string('project_name', 128).notNullable()
        projectTbl.string('project_description', 256)
        projectTbl.boolean('project_completed').defaultTo(false) 

    })    
    .createTableIfNotExists('resources', (resourceTbl) => {

        resourceTbl.increments('resource_id')   
        resourceTbl.string('resource_name', 128).notNullable().unique()    
        resourceTbl.string('resource_description', 256)

    })
    .createTableIfNotExists('tasks', (taskTbl) => {

        taskTbl.increments('task_id')
        taskTbl.string('task_description', 256).notNullable()    
        taskTbl.string('task_notes', 128)
        taskTbl.boolean('task_completed').defaultTo(false)    
        taskTbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })

    .createTableIfNotExists('project_resources', (table) => {

        table.increments('project_resource_id')
        table.string('project_assignment')
        table.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('resource_id')
            .inTable('resources')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')

        table.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')

    })

    };

exports.down = async function(knex) {
  await knex.schema
.dropTableIfExists('project_resources')
.dropTableIfExists('tasks')
.dropTableIfExists('resources')
.dropTableIfExists('projects')

};
