
const { test } = require('node:test');

const sum = require('./sum');

test('Adds one and two', () =>
{
    expect(sum(1, 2)).toBe(3);
});
/*
const recipe = require('../controllers/recipe');

const req = {
    body: {
      title: 'Test Recipe',
      description: 'This is a test recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      // Include other required fields in the body as needed
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn()

test('Testing addRecipe Function', async () => 
{
    //await recipe.addRecipe(req, res, next);
    expect(recipe.addRecipe(req, res, next)).toBe({});
});
*/


//const { test } = require('node:test');
// const mod = require('../controllers/modification');

// test('Testing getAllMod', () =>
// {
//     expect(mod.getAllMod()).toBeTruthy();
// });