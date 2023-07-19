const router = require('express').Router();
const {  ensureAuth } = require('../controllers/authentication');
const { addRecipe, updateRecipe, getRecipe, getRecipesByCategory, getRecipesByKeyword, getRecipesByUser, deleteRecipe, addRecipeImage, removeRecipeImage } = require('../controllers/recipe');

// Add recipe
router.post('/addRecipe', ensureAuth, addRecipe);

// Update recipe by id
router.put('/updateRecipe/:recipeId', ensureAuth, updateRecipe);

// Get recipe by id
router.get('/getRecipe/:recipeId', ensureAuth, getRecipe);

// Get all recipes of a category
router.get('/getCategory/:categoryId', ensureAuth, getRecipesByCategory);

// Get recipes by searching a keyword
router.get('/getKeyword/:searchKey', ensureAuth, getRecipesByKeyword);

// Get recipes submitted by a user
router.get('/getUserRecipes/:userId', ensureAuth, getRecipesByUser);
router.get('/getUserRecipes', ensureAuth, getRecipesByUser);

// Delete recipe by id
router.delete('/deleteRecipe/:recipeId', ensureAuth, deleteRecipe);

module.exports = router;
