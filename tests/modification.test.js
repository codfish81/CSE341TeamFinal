// Import the necessary modules and functions
const { ObjectId } = require('mongodb');
const modController = require('../controllers/modification');
const mongo = require('../db/connect');
const { object } = require('webidl-conversions');

// Mock the MongoDB find method
jest.mock('../db/connect', () => ({
  getConnection: jest.fn().mockReturnValue({
    db: jest.fn().mockReturnThis(),
    collection: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    insertOne: jest.fn()
  }),
}));

// -------------------------------------------------------------------------------------
  it('Testing getModById', async () => 
  {
    const expectedReturn = 
    {
        '_id': new ObjectId('64a22c4d51e7e53a3553526a'),
        'modified_collection': "comment",
        'modified_type': "Edit Comment",
        'userId': new ObjectId('6497d5d064035756f4d29abc')
    };

    // mock req, res, next objects
    const req = { params: { commentId: '64a22c4d51e7e53a3553526a' } };
    const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    // Mock the MongoDB find method
    const mockFindResult = { toArray: jest.fn().mockResolvedValue([expectedReturn]) };
    mongo.getConnection().find.mockReturnValue(mockFindResult);

    // call the function with the mocked objects
    await modController.getModById(req, res, next);

    // make assertions on the mocked objects
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedReturn);
});
// -------------------------------------------------------------------------------------
it('Testing getModByUserId', async () => {
    // Generate dynamic comment data
    const modId = new ObjectId('64a22c4d51e7e53a3553526a');
    const userId = '6497d5d064035756f4d29abc';
    const modCollection = 'recipe';
    const modDate = new Date().toISOString(); 
    const modType = 'instructions';
    const expectedReturn = 
    {
        '_id': modId,
        'date': modDate,
        'modified_collection': modCollection,
        'modified_type': modType,
        'userId': new ObjectId(userId)
    };

    // Mock the request and response objects
    const req = { params: { userId: '6497d5d064035756f4d29abc' } };
    const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    // Mock the MongoDB find method to return dynamic comment data
    const mockFindResult = { toArray: jest.fn().mockResolvedValue([expectedReturn]) };
    mongo.getConnection().find.mockReturnValue(mockFindResult);

    // Call the function
    await modController.getModByUserId(req, res, next);

    // Make assertions
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedReturn);
  });
// -------------------------------------------------------------------------------------
  it('Testing addNewMod', async () => {
    // Generate dynamic comment data
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    let today_date = `${month}/${day}/${year}`;

    const userId = '6497d5d064035756f4d29abc';
    const modCollection = 'comment';
    const modType = 'New Comment';
    const insertedId = '6497d5d064035756f6549ggh';

    // Mock the request object
    const req = 
    {
        body: 
        {
            today_date,
            modCollection,
            modType,
            userId
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
    await modController.addNewMod(modCollection, userId, modType);
    // Make assertions
    //expect(res.status).toHaveBeenCalledWith(201);
    //expect(res.json).toHaveBeenCalledWith(mockInsertResult);
    expect(mongo.getConnection().insertOne).toHaveBeenCalledWith(
        {
            date: today_date,
            modified_collection: modCollection,
            modified_type: modType,
            userId: (userId),
        });
  });
// -------------------------------------------------------------------------------------
it('Tests updateMod', async () => {
  const date = "10/20/2050";
  const collection = "Modification";
  const modId = '64b34fc105a69bd4cd86e0da';
  const newType = 'Modification Updated';
  const userId = '6497d5d064035756f4d29abc';

  const req = {
    params: {
      modId
    },
    body: {
      today_date: date,
      collection: collection,
      type: newType,
      userId: userId
    }
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };

  const mockUpdateResult = jest.fn().mockImplementation(() => Promise.resolve({
    acknowledged: true,
    modifiedCount: 1
  }));
  mongo.getConnection().replaceOne = mockUpdateResult;

  await modController.updateModById(req, res);

  expect(res.status).toHaveBeenCalledWith(204);
  expect(res.send).toHaveBeenCalledWith({
    acknowledged: true,
    modifiedCount: 1
  });
  expect(mongo.getConnection().replaceOne).toHaveBeenCalledWith(
    { _id: new ObjectId('64b34fc105a69bd4cd86e0da') },
    {
      date: date,
      modified_collection: collection,
      modified_type: newType,
      userId: userId
    }
  );
});


//Test delete mod
it('should delete a mod by id', async () => {
  const modId = '64b5d966bd63e96ae90f6d9d';
  const req = {
    params: {
      modId,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  };

  const mockDeleteResult = jest.fn().mockImplementation(() => Promise.resolve({
    acknowledged: true,
    deletedCount: 1,
  }));
  mongo.getConnection().deleteOne = mockDeleteResult;

  await modController.deleteModById(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.send).toHaveBeenCalled();
});