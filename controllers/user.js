const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function createNewUser(req, res, next){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Create a new User'
    // #swagger.description = 'This request creates a new user'
 
    res.send('create new user');
}

async function getUserByUserId(req, res, next){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get user by User Id'
    // #swagger.description = 'This will get a user by its Id'
    // #swagger.parameters['userId'] = { description: 'User id' }

    res.send('get user by user id');
}

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
    res.send('update user');
}
async function deleteUser(req, res, next){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete user'
    // #swagger.description = 'Delete user by Id'
    // #swagger.parameters['userId'] = { description: 'User id' }
    res.send('delete user');
}

module.exports = {
    getUserByUserId,
    createNewUser,
    updateUser,
    deleteUser
}