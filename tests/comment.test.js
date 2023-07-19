// Import the necessary modules and functions
const { ObjectId } = require('mongodb');
const commentsController = require('../controllers/comment');
const mongo = require('../db/connect');

// Mock the MongoDB find method
jest.mock('../db/connect', () => ({
    getConnection: jest.fn().mockReturnValue({
      db: jest.fn().mockReturnThis(),
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      insertOne: jest.fn(),
    }),
  }));

it('getCommentByCommentId returns correct comment', async () => {
    const expectedComment = {
        '_id': new ObjectId('64a22c4d51e7e53a3553526d'),
        'userId': new ObjectId('6497d5d064035756f4d29abc'),
        'recipeId': new ObjectId('6497d5d064035756f481def5'),
        'text': 'I really like this recipe, but...',
        'commentDate': '2023-07-03T02:02:53.430Z'
      };
    // mock req, res, next objects
    const req = { params: { commentId: '64a22c4d51e7e53a3553526d' } };
    const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    // Mock the MongoDB find method
    const mockFindResult = {
        toArray: jest.fn().mockResolvedValue([expectedComment]),
    };
    mongo.getConnection().find.mockReturnValue(mockFindResult);

    // call the function with the mocked objects
    await commentsController.getCommentByCommentId(req, res, next);

    // make assertions on the mocked objects
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedComment);
});

it('getCommentsByUserId returns correct comment', async () => {
    // Generate dynamic comment data
    const commentId = new ObjectId();
    const userId = new ObjectId();
    const recipeId = new ObjectId();
    const commentDate = new Date().toISOString();
    const text = ''; 
    const expectedComment = {
      '_id': commentId,
      'userId': userId,
      'recipeId': recipeId,
      'text': text,
      'commentDate': commentDate
    };
  
    // Mock the request and response objects
    const req = { params: { userId: userId.toString() } };
    const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
  
    // Mock the MongoDB find method to return dynamic comment data
    const mockFindResult = {
      toArray: jest.fn().mockResolvedValue([expectedComment]),
    };
    mongo.getConnection().find.mockReturnValue(mockFindResult);
  
    // Call the function
    await commentsController.getCommentByCommentId(req, res, next);
  
    // Make assertions
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedComment);
  });

  it('getCommentsByRecipeId returns correct comment', async () => {
    // Generate dynamic comment data
    const commentId = new ObjectId();
    const userId = new ObjectId();
    const recipeId = new ObjectId();
    const commentDate = new Date().toISOString();
    const text = ''; 
    const expectedComment = {
      '_id': commentId,
      'userId': userId,
      'recipeId': recipeId,
      'text': text,
      'commentDate': commentDate
    };
  
    // Mock the request and response objects
    const req = { params: { recipeId: recipeId.toString() } };
    const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
  
    // Mock the MongoDB find method to return dynamic comment data
    const mockFindResult = {
      toArray: jest.fn().mockResolvedValue([expectedComment]),
    };
    mongo.getConnection().find.mockReturnValue(mockFindResult);
  
    // Call the function
    await commentsController.getCommentByCommentId(req, res, next);
  
    // Make assertions
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedComment);
  });  

  it('createNewComment creates a new comment record', async () => {
    // Generate dynamic comment data
    const userId = '6497d5d064035756f4d29abc';
    const recipeId = '6497d5d064035756f481def5';
    const text = 'I really like this recipe!';
    const insertedId = new ObjectId().toString();
  
    // Mock the request object
    const req = {
      body: {
        userId,
        recipeId,
        text,
      },
    };
  
    // Mock the response object
    const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
  
    // Mock the MongoDB insertOne method
    const mockInsertResult = {
        insertedId,
    };
    mongo.getConnection().insertOne.mockResolvedValue(mockInsertResult);
  
    // Call the function
    await commentsController.createNewComment(req, res);
    // Make assertions
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith( mockInsertResult);
    expect(mongo.getConnection().insertOne).toHaveBeenCalledWith({
      userId: new ObjectId(userId),
      recipeId: new ObjectId(recipeId),
      text,
      commentDate: expect.stringMatching(new Date().toISOString().slice(0, 19)),
    });
  });

  it('updateComment updates an existing comment', async () => {

    const commentId = '64b34fc105a69bd4cd86e0da';
    const newText = 'This is running from a jest test';

    const req = { 
      params: { 
        commentId,
      },
      body: {
        text: newText,
      }
    }; 

    const res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn()
    };

    const mockUpdateResult = jest.fn().mockImplementation(() => Promise.resolve({
      acknowledged: true,
      modifiedCount: 1,
    }));
    mongo.getConnection().updateOne = mockUpdateResult;

    await commentsController.updateComment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      acknowledged: true,
      modifiedCount: 1,
    });
    expect(mongo.getConnection().updateOne).toHaveBeenCalledWith(
      { _id: new ObjectId(commentId)},
      { $set: { text: newText }}
    );
  });

  it('deleteComment deletes a comment with a given commentId', async () => {
    const commentId = '64b34fc105a69bd4cd86e0da';

    const req = {
      params: {
        commentId,
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const mockDeleteResult = jest.fn().mockImplementation(() => Promise.resolve({
      "acknowledged": true,
      "deletedCount": 1
    }));

    mongo.getConnection().deleteOne = mockDeleteResult;

    await commentsController.deleteComment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      "acknowledged": true,
      "deletedCount": 1
    });
  })