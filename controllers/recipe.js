const mongo = require('../db/connect');
const modify = require('./modification');
const ObjectId = require('mongodb').ObjectId;
const { param, validationResult } = require('express-validator');
const { body } = require('express-validator');

// Add a recipe
async function addRecipe(req, res, next) {
    try {
        // #swagger.tags = ['Recipes']
        // #swagger.summary = 'Add a new recipe'
        // #swagger.description = 'This route allows you to create a new recipe.'

        await Promise.all([
            body('title').notEmpty().withMessage('Title is required').run(req),
            body('description').notEmpty().withMessage('Description is required').run(req),
            body('ingredients').notEmpty().withMessage('Ingredients are required').run(req),
            body('instructions').notEmpty().withMessage('Instructions are required').run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            description,
            ingredients,
            instructions,
            time,
            servingSize,
            categoryId,
            dateAdded,
            userId
        } = req.body;

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

        await modify.addNewMod("Recipe", result.userId, "Added recipe");

    } catch (error) {
        next(error);
    }
}


// Update recipe by id
async function updateRecipe(req, res, next) {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Update recipe by id'
    // #swagger.description = 'This route allows you to update a recipe by its id.'

    try {
        // Validation rules
        await Promise.all([
            body('title').trim().isLength({ min: 2 }).withMessage('Title is required').run(req),
            body('description').trim().isLength({ min: 2 }).withMessage('Description is required').run(req),
            body('ingredients').trim().isLength({ min: 2 }).withMessage('Ingredients are required').run(req),
        ]);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const recipeId = new ObjectId(req.params.recipeId);

        const {
            title,
            description,
            ingredients,
            instructions,
            time,
            servingSize,
            categoryId,
            dateChanged
        } = req.body;
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
                    categoryId,
                    dateChanged: new Date(),
                },
            }
        );
        if (result.matchedCount === 1) {
            res.status(200).json({ message: 'Recipe updated' });

            await modify.addNewMod("Recipe", result.userId, "Updated recipe");

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

    try {
        // Check if recipeId parameter is present
        if (!req.params.recipeId) {
            return res.status(400).json({ message: 'Missing recipeId parameter' });
        }

        // Validation rules
        await param('recipeId').isMongoId().withMessage('Invalid recipe ID').run(req);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const recipeId = new ObjectId(req.params.recipeId);

        const recipe = await mongo.getConnection().db('flavor-hub').collection('recipe').findOne({ _id: recipeId });

        // Check if recipe exists
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}


// Get all recipes by categoryId
async function getRecipesByCategory(req, res, next) {
    try {
        // #swagger.tags = ['Recipes']
        // #swagger.summary = 'Get all recipes of a category'
        // #swagger.description = 'This route allows you to retrieve all recipes of a specific category.'

        // Validation rules
        await param('categoryId').notEmpty().withMessage('Category ID is required').run(req);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const collection = mongo.getConnection().db('flavor-hub').collection('recipe');

        // Check if the index exists
        const indexInfo = await collection.indexInformation();
        if (Object.keys(indexInfo).length > 1) {
            // Remove old index
            await collection.dropIndexes();
        }

        // Create a new index
        await collection.createIndex({ categoryId: 'text' });

        const searchWord = req.params.categoryId;

        const recipes = await collection.find({ $text: { $search: searchWord } }).toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(recipes, null, 2));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// Get recipes by keyword
async function getRecipesByKeyword(req, res, next) {
    try {
        // #swagger.tags = ['Recipes']
        // #swagger.summary = 'Get recipes by keyword'
        // #swagger.description = 'This route allows you to retrieve recipes by searching for a keyword.'

        // Validation rules
        await param('searchKey').notEmpty().withMessage('Search key is required').run(req);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const collection = mongo.getConnection().db('flavor-hub').collection('recipe');

        // Check if the index exists
        const indexInfo = await collection.indexInformation();
        if (Object.keys(indexInfo).length > 1) {
            // Remove old index
            await collection.dropIndexes();
        }

        // Create a new index
        await collection.createIndex({ title: 'text', description: 'text', ingredients: 'text', instructions: 'text' });

        const searchWord = req.params.searchKey;

        const recipes = await collection.find({ $text: { $search: searchWord } }).toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(recipes, null, 2));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// Get recipes by user id
async function getRecipesByUser(req, res, next) {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get recipes by a user'
    // #swagger.description = 'This route allows you to get recipes by a user.'
    try {

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let userId;

        // Check if the userId parameter is provided in the request
        if (req.params.userId) {
            // Use parameter if given
            userId = new ObjectId(req.params.userId);
            console.log('1')
        } else {
            // Otherwise, use the userId from the session
            userId = req.session.passport.user
            console.log(userId)
        }

        const recipes = await mongo.getConnection().db('flavor-hub').collection('recipe').find({ userId: userId.toString() }).toArray();

        if (recipes.length > 0) {
            // Respond with the found recipes
            return res.status(200).json(recipes);
        } else {
            // No recipes found for the specified userId
            return res.status(404).json({ message: 'No recipes found for the specified userId' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// Delete recipe by id
async function deleteRecipe(req, res, next) {
    try {
        // #swagger.tags = ['Recipes']
        // #swagger.summary = 'Delete recipe by id'
        // #swagger.description = 'This route allows you to delete a recipe by its id.'
        // #swagger.parameters['recipeId'] = {
        //      description: 'Recipe ID.',
        //      required: true,
        //      type: 'string'
        // }

        const recipeId = new ObjectId(req.params.recipeId);

        // Validation rules
        await validationResult(req);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const result = await mongo.getConnection().db('flavor-hub').collection('recipe').deleteOne({ _id: recipeId });

        console.log(result)

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Recipe deleted' });

            await modify.addNewMod("Recipe", result.userId, "Deleted recipe");

        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

module.exports = {
    addRecipe,
    updateRecipe,
    getRecipe,
    getRecipesByCategory,
    getRecipesByKeyword,
    getRecipesByUser,
    deleteRecipe
}
