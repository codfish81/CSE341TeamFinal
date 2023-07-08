const router = require('express').Router();

const { addRecipe, updateRecipe, getRecipe, getRecipesByCategory, getRecipesByKeyword, getRecipesByUser, deleteRecipe, addRecipeImage, removeRecipeImage } = require('../controllers/recipe');

// Add new recipe
router.post('/', addRecipe);

// Update recipe by id
<<<<<<< HEAD
router.put('/:recipeId', updateRecipe);

// Get recipe by id
router.get('/:recipeId', getRecipe);

// Get all recipes of a category
router.get('/:categoryId', getRecipesByCategory);

// Get recipes by keyword anywhere
router.get('/:keywordId', getRecipesByKeyword);

// Get recipes submitted by a user
router.get('/:userId', getRecipesByUser);

// Delete recipe by id
router.delete('/:recipeId', deleteRecipe);

// Add recipe image
router.post('/:recipeId/uploadImage', addRecipeImage);

// Delete recipe image
router.delete('/:recipeId/deleteImage', removeRecipeImage);

module.exports = router;
=======
router.put('/updateRecipe/:recipeId', updateRecipe);

// Get recipe by id
router.get('/getRecipe/:recipeId', getRecipe);

// Get all recipes of a category
router.get('/getCategory/:categoryId', getRecipesByCategory);

// Get recipes by searching a keyword
router.get('/getKeyword/:searchKey', getRecipesByKeyword);

// Get recipes submitted by a user
router.get('/getUserRecipe/:userId', getRecipesByUser);

// Delete recipe by id
router.delete('/deleteRecipe/:recipeId', deleteRecipe);

// Add recipe image
router.post('/uploadImage/:recipeId', addRecipeImage);

// Delete recipe image
router.delete('/deleteImage/:recipeId', removeRecipeImage);

module.exports = router;
>>>>>>> origin/main
