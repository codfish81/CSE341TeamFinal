const { addRecipe, updateRecipe, getRecipe, getRecipesByCategory, getRecipesByKeyword, getRecipesByUser, deleteRecipe, addRecipeImage, removeRecipeImage } = require('./controllers/recipe');


test('adds 1 + 2 to equal 3', () => {
  expect(addRecipe(1, 2)).toBe(3);
});


test('adds 2 + 2 to equal 4', () => {
  expect(sum(2, 2)).toBe(4);
});