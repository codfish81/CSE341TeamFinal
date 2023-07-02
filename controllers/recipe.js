const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Add a recipe
async function addRecipe(req, res, next) {
    try {
        // #swagger.tags = ['Recipes']
        // #swagger.summary = 'Add a new recipe'
        // #swagger.description = 'This route allows you to create a new recipe.'
        // #swagger.parameters['recipeData'] = {
        //      in: 'body',
        //      description: 'Recipe data.',
        //      required: true,
        //      schema: {
        //          $ref: '#/definitions/RecipeInput'
        //      }
        // }
        // #swagger.responses[201] = {
        //      description: 'Recipe added successfully',
        //      schema: {
        //          $ref: '#/definitions/RecipeId'
        //      }
        // }
        const { title, description, ingredients, instructions, time, servingSize, categoryId, userId } = req.body;

        // Data validation
        if (!title || !description || !ingredients) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Insert recipe into database
        const result = await mongo.getConnection().db('flavor-hub').collection('recipe').insertOne({
            title,
            description,
            ingredients,
            instructions,
            time,
            servingSize,
            categoryId,
            dateAdded: Date(),
            userId,
        });

        res.status(201).json({ id: result.insertedId });
    } catch (error) {
        next(error);
    }
}

// Update recipe by id
async function updateRecipe(req, res, next) {
    try {
        // #swagger.tags = ['Recipes']
        // #swagger.summary = 'Update recipe by id'
        // #swagger.description = 'This route allows you to update a recipe by its id.'
        // #swagger.parameters['recipeId'] = {
        //      description: 'Recipe ID.',
        //      in: 'path',
        //      required: true,
        //      type: 'string'
        // }
        // #swagger.parameters['recipeData'] = {
        //      in: 'body',
        //      description: 'Recipe data.',
        //      required: true,
        //      schema: {
        //          $ref: '#/definitions/RecipeUpdateInput'
        //      }
        // }
        // #swagger.responses[200] = {
        //      description: 'Recipe updated successfully'
        // }
        const recipeId = new ObjectId(req.params.recipeId);
        const { title, description, ingredients, instructions, time, servingSize } = req.body;

        // Data validation
        if (!title || !description || !ingredients) {
            return res.status(400).json({ message: 'A required field is missing' });
        }

        // Update recipe in the database
        const result = await mongo.getConnection().db('flavor-hub').collection('recipe').updateOne(
            { _id: recipeId },
            {
                $set: {
                    title,
                    description,
                    ingredients,
                    instructions,
                    time,
                    servingSize,
                    dateChanged: new Date(),
                },
            }
        );
        if (result.matchedCount === 1) {
            res.status(200).json({ message: 'Recipe updated' });
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        next(error);
    }
}

// Get recipe by id
async function getRecipe(req, res, next) {

    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get a recipe'
    // #swagger.description = 'This route allows you to get a recipe by its id.'
    // #swagger.responses[200] = {
    //      description: 'Recipe retrieved successfully'
    // }
    try {
        const recipeId = new ObjectId(req.params.recipeId);

        if (!ObjectId.isValid(recipeId)) {
            return res.status(400).json({ message: 'Invalid recipe ID' });
        }

        const recipe = await mongo.getConnection().db('flavor-hub').collection('recipe').findOne({ _id: recipeId });

        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Get all recipes by categoryId
async function getRecipesByCategory(req, res, next) {

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
    try {
        await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('recipe')
            .createIndex({ categoryId: 'text' });

        const searchWord = req.params.categoryId;

        const recipes = await mongo.getConnection().db('flavor-hub').collection('recipe').find({ $text: { $search: searchWord } }).toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(recipes, null, 2));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// Get recipes by keyword
async function getRecipesByKeyword(req, res, next) {

    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get recipes by keyword'
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
    try {
        await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('recipe')
            .createIndex({ title: 'text', description: 'text', ingredients: 'text', instructions: 'text' });

        const searchWord = req.params.keywordId;

        const recipes = await mongo.getConnection().db('flavor-hub').collection('recipe').find({ $text: { $search: searchWord } }).toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(recipes, null, 2));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// Get recipes by userId
async function getRecipesByUser(req, res, next) {

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

    try {
        const userId = req.query.userId;

        const recipes = await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('recipe')
            .find({ userId: { $eq: userId } }) // Update the query to search for the userId field
            .toArray();

        if (recipes.length > 0) {
            res.status(200).json(recipes);
        } else {
            res.status(404).json({ message: 'No recipes found for the specified userId' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// Delete recipe by id
async function deleteRecipe(req, res, next) {

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
    try {
        const recipeId = new ObjectId(req.params.recipeId);
        const result = await mongo.getConnection().db('flavor-hub').collection('recipe').deleteOne({ _id: recipeId });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Recipe deleted' });
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
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


