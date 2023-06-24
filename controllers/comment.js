const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function getCommentByCommentId(req, res, next){
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Get Comment by Comment Id'
    // #swagger.description = 'This will get a comment by its Id'
    // #swagger.parameters['commentId'] = { description: 'Comment id' }

    res.send('get comment by comment id');
}

async function getCommentsByUserId(req, res, next){
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Get comments by User'
    // #swagger.description = 'This will all comments by a certain user'
    // #swagger.parameters['userId'] = { description: 'User id' }
    res.send('get comments by user id');
}

async function getCommentsByRecipeId(req, res, next){
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Get Comments by Recipe'
    // #swagger.description = 'This will get all comments by a certain recipe'
    res.send('get comments by recipe id');
}

async function createNewComment(req, res, next){
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Create a new Comment'
    // #swagger.description = 'This request creates a new comment'
 
    res.send('create new comment');
}
async function updateComment(req, res, next){
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Update comment'
    // #swagger.description = 'Updates a comment by id'
    /* #swagger.parameters['commentId'] = {
        in: 'path',
        description: 'Comment ID.',
        required: true,
        type: 'string'
    } 
    */
    res.send('update comment');
}
async function deleteComment(req, res, next){
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Delete comment'
    // #swagger.description = 'Delete comment by Id'
    // #swagger.parameters['commentId'] = { description: 'Comment id' }
    res.send('delete comment');
}

module.exports = {
    getCommentByCommentId,
    getCommentsByRecipeId,
    getCommentsByUserId,
    createNewComment,
    updateComment,
    deleteComment
}
