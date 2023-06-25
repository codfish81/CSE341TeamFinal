const router = require('express').Router();

const { addRecipe, updateRecipe, getRecipe, getRecipesByCategory, getRecipesByKeyword, getRecipesByUser, deleteRecipe, addRecipeImage, removeRecipeImage } = require('../controllers/recipe');

// Add new recipe
router.post('/', addRecipe);

// Update recipe by id
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
