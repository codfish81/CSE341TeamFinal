const router = require('express').Router();

const { addRecipe, updateRecipe, getRecipe, getRecipesByCategory, getRecipesByKeyword, getRecipesByUser, deleteRecipe, addRecipeImage, removeRecipeImage } = require('../controllers/recipe');

// Add new recipe
router.post('/', addRecipe);

// Update recipe by id
router.put('/updateRecipe/:recipeId', updateRecipe);

// Get recipe by id
router.get('/getRecipe/:recipeId', getRecipe);

// Get all recipes of a category
router.get('/getCategory/:categoryId', getRecipesByCategory);

// Get recipes by keyword anywhere
router.get('/getKeyword/:keywordId', getRecipesByKeyword);

// Get recipes submitted by a user
router.get('/getUserRecipe/:userId', getRecipesByUser);

// Delete recipe by id
router.delete('/deleteRecipe/:recipeId', deleteRecipe);

// Add recipe image
router.post('/uploadImage/:recipeId', addRecipeImage);

// Delete recipe image
router.delete('/deleteImage/:recipeId', removeRecipeImage);

module.exports = router;
