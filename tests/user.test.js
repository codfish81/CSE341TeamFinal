// Import the necessary modules and functions
const { ObjectId } = require('mongodb');
const userController = require('../controllers/user');
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

it('getUserByUserId returns correct user', async () => {
    const expectedUser = {
        '_id': new ObjectId('649e320a6bbe500a1aeb6775'),
        'googleId': '',
        'displayName': '',
        'firstName': 'Cade',
        'lastName': 'Hansen',
        'email': 'cadehansen@email.com',
        
      };
    // mock req, res, next objects
    const req = { params: { userId: '6649e320a6bbe500a1aeb6775' } };
    const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    // Mock the MongoDB find method
    const mockFindResult = {
        toArray: jest.fn().mockResolvedValue([expectedUser]),
    };
    mongo.getConnection().find.mockReturnValue(mockFindResult);

    // call the function with the mocked objects
    await userController.getUserByUserId(req, res, next);

    // make assertions on the mocked objects
    //expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    //expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.json).toHaveBeenCalledWith(expectedUser);
});

it('createNewUser creates a new user', async () => {
    // Generate dynamic comment data
    const googleId = '';
    const displayName = '';
    const firstName = 'Cade';
    const lastName = 'Hansen';
    const email = 'cadehansen@email.com';
    const insertedId = new ObjectId().toString();
  
    // Mock the request object
    const req = {
      body: {
        googleId,
        displayName,
        firstName,
        lastName,
        email
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
    await userController.createNewUser(req, res);
    // Make assertions
    // expect(res.status).toHaveBeenCalledWith(201);
    // expect(res.json).toHaveBeenCalledWith( mockInsertResult);
    // expect(mongo.getConnection().insertOne).toHaveBeenCalledWith({
    //   googleId,
    //   displayName,
    //   firstName,
    //   lastName,
    //   email
    // });
  });

  it('updateUser updates an existing user', async () => {

    const userId = '649e320a6bbe500a1aeb6774';
    const newText = 'This is running from a jest test';

    const req = { 
      params: { 
        userId,
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

    await userController.updateUser(req, res);

    // expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   acknowledged: true,
    //   modifiedCount: 1,
    // });
    // expect(mongo.getConnection().updateOne).toHaveBeenCalledWith(
    //   { _id: new ObjectId(userId)},
    //   { $set: { text: newText }}
    // );
  });

  it('deleteUser deletes a user with a given userId', async () => {
    const userId = '649e3fda54f5bf839d36bf96';

    const req = {
      params: {
        userId,
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

    await userController.deleteUser(req, res);

    // expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   "acknowledged": true,
    //   "deletedCount": 1
    // });
  })