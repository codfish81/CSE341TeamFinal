const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function createNewUser(req, res, next){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Create a new User'
    // #swagger.description = 'This request creates a new user'
    try{
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        };
        const response = await mongodb.getDb().db('flavor-hub').collection('user').insertOne(user);
        if (response.acknowledged) {
          res.status(201).json(response);
        } else {
          res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
      }catch(err){
        res.status(500).json(err);
      }
    };

async function getUserByUserId(req, res, next){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get user by User Id'
    // #swagger.description = 'This will get a user by its Id'
    // #swagger.parameters['userId'] = { description: 'User id' }

    try{
        if (!ObjectId.isValid(req.params.id)){
          res.status(400).json('Must use valid id to get User.');
        }
          const userId = new ObjectId(req.params.id);
          const result = await mongodb.getDb().db('flavor-hub').collection('user').find({_id: userId});
          result.toArray().then((lists) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(lists[0]);
        });
      }catch(err){
        res.status(500).json(err);
      }
    };

async function updateUser(req, res, next){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update user'
    // #swagger.description = 'Updates a user by id'
    /* #swagger.parameters['userId'] = {
        in: 'path',
        description: 'User ID.',
        required: true,
        type: 'string'
    } 
    */
    try{
        if (!ObjectId.isValid(req.params.id)){
          res.status(400).json('Must use valid id to update user.');
        }
        const userId = new ObjectId(req.params.id);
        // be aware of updateOne if you only want to update specific fields
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        };
        const response = await mongodb
          .getDb()
          .db('flavor-hub')
          .collection('user')
          .replaceOne({ _id: userId }, user);
        console.log(response);
        if (response.modifiedCount > 0) {
          res.status(204).send();
        } else {
          res.status(500).json(response.error || 'Some error occurred while updating the user.');
        }
      }catch(err){
        res.status(500).json(err);
      }
    };

async function deleteUser(req, res, next){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete user'
    // #swagger.description = 'Delete user by Id'
    // #swagger.parameters['userId'] = { description: 'User id' }
    try{
        if (!ObjectId.isValid(req.params.id)){
          res.status(400).json('Must use valid id to delete user.');
        }
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db('flavor-hub').collection('user').deleteOne({ _id: userId }, true);
        console.log(response);
        if (response.deletedCount > 0) {
          res.status(200).send();
        } else {
          res.status(500).json(response.error || 'Some error occurred while deleting the user.');
        }
      }catch(err){
        res.status(500).json(err);
      }
    };
    

module.exports = {
    getUserByUserId,
    createNewUser,
    updateUser,
    deleteUser
}