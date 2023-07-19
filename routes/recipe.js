const router = require('express').Router();
const {  ensureAuth } = require('../controllers/authentication');
const { addRecipe, updateRecipe, getRecipe, getRecipesByCategory, getRecipesByKeyword, getRecipesByUser, deleteRecipe, addRecipeImage, removeRecipeImage } = require('../controllers/recipe');

// Add recipe
router.post('/addRecipe', addRecipe);

// Update recipe by id
router.put('/updateRecipe/:recipeId', updateRecipe);

// Get recipe by id
router.get('/getRecipe/:recipeId', getRecipe);

// Get all recipes of a category
router.get('/getCategory/:categoryId', getRecipesByCategory);

// Get recipes by searching a keyword
router.get('/getKeyword/:searchKey', getRecipesByKeyword);

// Get recipes submitted by a user
router.get('/getUserRecipes/:userId', getRecipesByUser);
router.get('/getUserRecipes', getRecipesByUser);

// Delete recipe by id
router.delete('/deleteRecipe/:recipeId', deleteRecipe);

module.exports = router;
