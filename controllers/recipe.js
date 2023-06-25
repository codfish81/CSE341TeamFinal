const mongo = require('../db/connect');


async function addRecipe(req, res, next) {
    // Update recipe by id
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Update recipe by id'
    // #swagger.description = 'This route allows you to update a recipe by its id.'
    // #swagger.responses[200] = {
    //      description: 'Recipe updated successfully'
    // }

    try {
        // Add recipe variables
        const { title, description, ingredients, instructions, time, servingSize, dateAdded = Date() } = req.body;

        // Insert recipe into database
        const result = await mongo.getConnection().db('flavor-hub').collection('recipe').insertOne({
            title,
            description,
            ingredients,
            instructions,
            time,
            servingSize,
            dateAdded,
        });

        res.status(201).json({ id: result.insertedId });
    } catch (error) {
        next(error);
    }
};


async function updateRecipe(req, res, next) {
    // Update recipe by id
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Update recipe by id'
    // #swagger.description = 'This route allows you to update a recipe by its id.'
    // #swagger.parameters['recipeId'] = {
    //      description: 'Recipe ID.',
    //      required: true,
    //      type: 'string'
    // }
    // #swagger.responses[200] = {
    //      description: 'Recipe updated successfully'
    // }
}

async function getRecipe(req, res, next) {
    // Get recipe by id
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get recipe by id'
    // #swagger.description = 'This route allows you to retrieve a recipe by its id.'
    // #swagger.parameters['recipeId'] = {
    //      description: 'Recipe ID.',
    //      required: true,
    //      type: 'string'
    // }
    // #swagger.responses[200] = {
    //      description: 'Recipe found'
    // }
}

async function getRecipesByCategory(req, res, next) {
    // Get all recipes by categoryId
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get all recipes of a category'
    // #swagger.description = 'This route allows you to retrieve all recipes of a specific category.'
    // #swagger.parameters['category'] = {
    //      in: 'query',
    //      description: 'Category',
    //      required: true,
    //      type: 'string'
    // }
    // #swagger.responses[200] = {
    //      description: 'Recipes found'
    // }
}

async function getRecipesByKeyword(req, res, next) {
    // Get recipes by keywordId
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get recipes by keyword anywhere'
    // #swagger.description = 'This route allows you to retrieve recipes by searching for a keyword.'
    // #swagger.parameters['keyword'] = {
    //      in: 'query',
    //      description: 'Keyword',
    //      required: true,
    //      type: 'string'
    // }
    // #swagger.responses[200] = {
    //      description: 'Recipes found'
    // }
}

async function getRecipesByUser(req, res, next) {
    // Get recipes by userId
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get recipes submitted by a user'
    // #swagger.description = 'This route allows you to retrieve recipes submitted by a specific user.'
    // #swagger.parameters['userId'] = {
    //      in: 'query',
    //      description: 'User ID',
    //      required: true,
    //      type: 'string'
    // }
    // #swagger.responses[200] = {
    //      description: 'Recipes found'
    // }
}

async function deleteRecipe(req, res, next) {
    // Delete recipe by id
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Delete recipe by id'
    // #swagger.description = 'This route allows you to delete a recipe by its id.'
    // #swagger.parameters['recipeId'] = {
    //      description: 'Recipe ID.',
    //      required: true,
    //      type: 'string'
    // }
    // #swagger.responses[200] = {
    //      description: 'Recipe deleted successfully'
    // }
}

async function addRecipeImage(req, res, next) {
    // Add recipe image
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Add recipe image'
    // #swagger.description = 'This route allows you to add an image to a recipe.'
    // #swagger.parameters['recipeId'] = {
    //      description: 'Recipe ID.',
    //      required: true,
    //      type: 'string'
    // }
    // #swagger.responses[200] = {
    //      description: 'Image added successfully'
    // }
}

async function removeRecipeImage(req, res, next) {
    // Remove recipe image
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Remove recipe image'
    // #swagger.description = 'This route allows you to remove an image from a recipe.'
    // #swagger.parameters['recipeId'] = {
    //      description: 'Recipe ID.',
    //      required: true,
    //      type: 'string'
    // }
    // #swagger.responses[200] = {
    //      description: 'Image deleted successfully'
    // }
}

module.exports = {
    addRecipe,
    updateRecipe,
    getRecipe,
    getRecipesByCategory,
    getRecipesByKeyword,
    getRecipesByUser,
    deleteRecipe,
    addRecipeImage,
    removeRecipeImage
}


