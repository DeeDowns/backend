
exports.up = function(knex) {
  return knex.schema
    .createTable('recipes', table => {
        table.increments()

        table.string('title', 256)
        .notNullable()
        .index()
        .unique()
        
        table.string('source', 256)
        .notNullable()
    
        table.string('description')
        .nullable()

        table.string('category', 80)
        .nullable()
        .index()

        table.string('image', 256)
        .nullable()

        table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')

        
    })

    .createTable('ingredients', table => {
        table.increments()

        table.string('ingredient', 256)
        .notNullable()
        .index()
    })

    .createTable('recipe_ingredients', table => {
        table.increments()

        table.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredients.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')

        table.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipes.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')

        table.string('quantity', 80)
        .notNullable()
        
        table.string('unit_of_measurement', 80)
        .notNullable()
    })


    .createTable('instructions', table => {
        table.increments()

        table.integer('recipe_id') 
        .unsigned()
        .notNullable()
        .references('recipes.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')

        table.integer('step_number')
        .notNullable()
        .index()

        table.string('instructions')
        .notNullable()
        .index()
    })

};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('recipe_categories')
  .dropTableIfExists('categories')
  .dropTableIfExists('instructions')
  .dropTableIfExists('recipe_ingredients')
  .dropTableIfExists('ingredients')
  .dropTableIfExists('recipes')
};
