const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function getCommentByCommentId(req, res, next){
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Get Comment by Comment Id'
    // #swagger.description = 'This will get a comment by its Id'
    // #swagger.parameters['commentId'] = { description: 'Comment id' }

    const commentId = new ObjectId(req.params.commentId);

    try {
        const result = await mongo
            .getConnection()
            .db("flavor-hub")
            .collection("comment").find({_id: commentId});
        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists[0]);
        });
    } catch (error) {
        next(error);
    }
}

async function getCommentsByUserId(req, res, next){
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Get comments by User'
    // #swagger.description = 'This will all comments by a certain user'
    // #swagger.parameters['userId'] = { description: 'User id' }

    const userId = new ObjectId(req.params.userId);

    try {
        const result = await mongo
            .getConnection()
            .db("flavor-hub")
            .collection("comment").find({userId: userId});
        result.toArray().then((list) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(list);
        });
    } catch (error) {
        next(error);
    }
}

async function getCommentsByRecipeId(req, res, next){
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Get Comments by Recipe'
    // #swagger.description = 'This will get all comments by a certain recipe'
    const recipeId = new ObjectId(req.params.recipeId);

    try {
        const result = await mongo
            .getConnection()
            .db("flavor-hub")
            .collection("comment").find({recipeId: recipeId});
        result.toArray().then((list) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(list);
        });
    } catch (error) {
        next(error);
    }
}

async function createNewComment(req, res, next){
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Create a new Comment'
    // #swagger.description = 'This request creates a new comment'
    /* #swagger.parameters['comment'] = { 
        in: 'body',
        description: 'Comment object',
        required: true,
        schema: {
            $eventName: 'First Anniversary',
            $eventDescription: 'We went to St George and ...',
            $lat: 37.0965,
            $long: 113.5684,
            $eventStartDate: '2011-10-05T14:48:00.000Z',
            $eventEndDate: '2011-10-05T14:48:00.000Z'
        }
    } */
 
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
