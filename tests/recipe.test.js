const mongo = require('../db/connect');
const recipeController = require('../controllers/recipe');
const modify = require('../controllers/modification');
const ObjectId = require('mongodb').ObjectId;
const { body } = require('express-validator');

//Test get recipes by category
jest.mock('../db/connect', () => ({
    getConnection: jest.fn().mockReturnValue({
        db: jest.fn().mockReturnThis(),
        collection: jest.fn().mockReturnThis(),
        indexInformation: jest.fn(),
        dropIndexes: jest.fn(),
        createIndex: jest.fn(),
        findOne: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        toArray: jest.fn(),
        insertOne: jest.fn(),
        updateOne: jest.fn(),
    }),
}));

jest.mock('../controllers/modification', () => ({
    addNewMod: jest.fn(),
}));

describe('addRecipe', () => {
    it('should add a recipe and return the inserted id', async () => {
        const req = {
            body: {
                title: 'Test Recipe',
                description: 'Test Description',
                ingredients: ['Test Ingredient 1', 'Test Ingredient 2'],
                instructions: ['Test Instruction 1', 'Test Instruction 2'],
                time: 30,
                servingSize: 4,
                categoryId: new ObjectId(),
                dateAdded: new Date(),
                userId: new ObjectId(),
            },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        const mockInsertResult = { insertedId: '6497d5d064035756f6549ggh' };
        mongo.getConnection().insertOne.mockResolvedValue(mockInsertResult);

        await recipeController.addRecipe(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: mockInsertResult.insertedId });
        //expect(modify.addNewMod).toHaveBeenCalledWith('Recipe', req.body.userId, 'Added recipe');
    });
});


describe('updateRecipe', () => {
    it('should update a recipe and return a success message', async () => {
        const recipeId = new ObjectId();
        const req = {
            params: { recipeId: recipeId.toString() },
            body: {
                title: 'Updated Test Recipe',
                description: 'Updated Test Description',
                ingredients: ['Updated Test Ingredient 1', 'Updated Test Ingredient 2'],
                instructions: ['Updated Test Instruction 1', 'Updated Test Instruction 2'],
                time: 45,
                servingSize: 6,
                categoryId: new ObjectId(),
                dateChanged: new Date(),
            },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        const mockUpdateResult = { matchedCount: 1 };
        mongo.getConnection().updateOne.mockResolvedValue(mockUpdateResult);

        await recipeController.updateRecipe(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Recipe updated' });
        //expect(modify.addNewMod).toHaveBeenCalledWith('Recipe', req.body.userId, 'Updated recipe');
    });

    it('should return a not found message if the recipe does not exist', async () => {
        const recipeId = new ObjectId();
        const req = {
            params: { recipeId: recipeId.toString() },
            body: {
                title: 'Updated Test Recipe',
                description: 'Updated Test Description',
                ingredients: ['Updated Test Ingredient 1', 'Updated Test Ingredient 2'],
                instructions: ['Updated Test Instruction 1', 'Updated Test Instruction 2'],
                time: 45,
                servingSize: 6,
                categoryId: new ObjectId(),
                dateChanged: new Date(),
            },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        const mockUpdateResult = { matchedCount: 0 };
        mongo.getConnection().updateOne.mockResolvedValue(mockUpdateResult);

        await recipeController.updateRecipe(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Recipe not found' });
    });
});

describe('getRecipe', () => {
    it('should return a recipe by id', async () => {
        const recipeId = '64a22c4d51e7e53a4853526a';
        const req = { params: { recipeId: recipeId.toString() } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        const mockRecipe = {
            _id: recipeId,
            // title: 'Test Recipe',
            // description: 'Test Description',
            // ingredients: ['Test Ingredient 1', 'Test Ingredient 2'],
            // instructions: ['Test Instruction 1', 'Test Instruction 2'],
            // time: 30,
            // servingSize: 4,
            // categoryId: new ObjectId(),
            // dateAdded: new Date(),
            // userId: '64b85579757ba5a6e782e87b',
        };
        console.log(mockRecipe);
        mongo.getConnection().findOne.mockResolvedValue(mockRecipe);

        await recipeController.getRecipe(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRecipe);
    });

    // it('should return a not found message if the recipe does not exist', async () => {
    //     const recipeId = '64a22c4d51e7e53a4853526a';
    //     const req = { params: { recipeId: recipeId.toString() } };
    //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    //     const next = jest.fn();

    //     mongo.getConnection().findOne.mockResolvedValue(null);

    //     await getRecipe(req, res, next);

    //     expect(res.status).toHaveBeenCalledWith(404);
    //     expect(res.json).toHaveBeenCalledWith({ message: 'Recipe not found' });
    // });
});




describe('getRecipesByCategory', () => {
    it('should return all recipes by categoryId', async () => {
        const categoryId = new ObjectId();
        const req = { params: { categoryId: categoryId.toString() } };
        const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        const mockRecipes = [
            {
                _id: new ObjectId(),
                title: 'Test Recipe 1',
                description: 'Test Description 1',
                ingredients: ['Test Ingredient 1', 'Test Ingredient 2'],
                instructions: ['Test Instruction 1', 'Test Instruction 2'],
                time: 30,
                servingSize: 4,
                categoryId,
                dateAdded: new Date(),
                userId: new ObjectId(),
            },
            {
                _id: new ObjectId(),
                title: 'Test Recipe 2',
                description: 'Test Description 2',
                ingredients: ['Test Ingredient 3', 'Test Ingredient 4'],
                instructions: ['Test Instruction 3', 'Test Instruction 4'],
                time: 45,
                servingSize: 6,
                categoryId,
                dateAdded: new Date(),
                userId: new ObjectId(),
            },
        ];
        mongo.getConnection().indexInformation.mockResolvedValue({});
        mongo.getConnection().toArray.mockResolvedValue(mockRecipes);

        await recipeController.getRecipesByCategory(req, res, next);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(JSON.stringify(mockRecipes, null, 2));
    });
});





describe('getRecipesByKeyword', () => {
    it('should return all recipes by keyword', async () => {
        const searchKey = 'Test';
        const req = { params: { searchKey } };
        const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        const mockRecipes = [
            {
                _id: new ObjectId(),
                title: 'Test Recipe 1',
                description: 'Test Description 1',
                ingredients: ['Test Ingredient 1', 'Test Ingredient 2'],
                instructions: ['Test Instruction 1', 'Test Instruction 2'],
                time: 30,
                servingSize: 4,
                categoryId: new ObjectId(),
                dateAdded: new Date(),
                userId: new ObjectId(),
            },
            {
                _id: new ObjectId(),
                title: 'Test Recipe 2',
                description: 'Test Description 2',
                ingredients: ['Test Ingredient 3', 'Test Ingredient 4'],
                instructions: ['Test Instruction 3', 'Test Instruction 4'],
                time: 45,
                servingSize: 6,
                categoryId: new ObjectId(),
                dateAdded: new Date(),
                userId: new ObjectId(),
            },
        ];
        mongo.getConnection().indexInformation.mockResolvedValue({});
        mongo.getConnection().toArray.mockResolvedValue(mockRecipes);

        await recipeController.getRecipesByKeyword(req, res, next);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(JSON.stringify(mockRecipes, null, 2));
    });
});




describe('getRecipesByUser', () => {
    it('should return all recipes by userId', async () => {
        const userId = new ObjectId();
        const req = { params: { userId: userId.toString() }, session: { passport: { user: new ObjectId() } } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        const mockRecipes = [
            {
                _id: new ObjectId(),
                title: 'Test Recipe 1',
                description: 'Test Description 1',
                ingredients: ['Test Ingredient 1', 'Test Ingredient 2'],
                instructions: ['Test Instruction 1', 'Test Instruction 2'],
                time: 30,
                servingSize: 4,
                categoryId: new ObjectId(),
                dateAdded: new Date(),
                userId,
            },
            {
                _id: new ObjectId(),
                title: 'Test Recipe 2',
                description: 'Test Description 2',
                ingredients: ['Test Ingredient 3', 'Test Ingredient 4'],
                instructions: ['Test Instruction 3', 'Test Instruction 4'],
                time: 45,
                servingSize: 6,
                categoryId: new ObjectId(),
                dateAdded: new Date(),
                userId,
            },
        ];
        mongo.getConnection().toArray.mockResolvedValue(mockRecipes);

        await recipeController.getRecipesByUser(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRecipes);
    });

    it('should return a not found message if no recipes are found for the specified userId', async () => {
        const userId = new ObjectId();
        const req = { params: { userId: userId.toString() }, session: { passport: { user: new ObjectId() } } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        mongo.getConnection().toArray.mockResolvedValue([]);

        await recipeController.getRecipesByUser(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No recipes found for the specified userId' });
    });
});


