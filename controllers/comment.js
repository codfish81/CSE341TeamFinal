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
            .db('flavor-hub')
            .collection('comment').find({_id: commentId});
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
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
            .db('flavor-hub')
            .collection('comment').find({userId: userId});
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
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
            .db('flavor-hub')
            .collection('comment').find({recipeId: recipeId});
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
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
            $userId: '6497d5d064035756f4d29abc',
            $recipeId: '6497d5d064035756f481def5',
            $text: 'I really like this recipe, but...'
        }
    } */

    try {
        // Get parameters from body and assign to variables
        const {userId, recipeId, text } = req.body;

        // turn userId and recipeId into ObjectIds

        const user = new ObjectId(userId);
        const recipe = new ObjectId(recipeId);

        // Timestamp for comment

        const date = new Date()

        const commentDate = date.toISOString();

        // Create document and insert into collection

        const comment = {
            userId: user,
            recipeId: recipe,
            text,
            commentDate
        };

        const result = await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('comment')
            .insertOne(comment);
        res.send(result).status(200);
            
    } catch (error) {
        res.status(500).send("Error creating comment: " + error);
    }
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
    #swagger.parameters['comment'] = { 
        in: 'body',
        description: 'Comment object',
        required: true,
        schema: {
            text: 'I really like this recipe, but...'
        }
    */
    try {
        // get comment id from parameter and text from request body
        const commentId = new ObjectId(req.params.commentId);
        const {text} = req.body;

        // update document and display results
        const result = await mongo.getConnection()
            .db('flavor-hub')
            .collection('comment')
            .updateOne({_id: commentId}, {$set: {text: text}});
        res.send(result).status(200);
    } catch (error) {
        res.status(501).send("Error updating comment: " + error);
    }
}
async function deleteComment(req, res, next){
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Delete comment'
    // #swagger.description = 'Delete comment by Id'
    // #swagger.parameters['commentId'] = { description: 'Comment id' }

    try {
        // get comment id from request parameters
        const commentId = new ObjectId(req.params.commentId);

        // delete document from collection 
        const result = await mongo.getConnection()
            .db('flavor-hub')
            .collection('comment')
            .deleteOne({_id: commentId});
        res.status(200).send(`{"responseMessage": "Comment record (${commentId}) was deleted successfully"}`);
    } catch (error) {
        res.status(502).send(`{"responseMessage": "Something went wrong when trying to delete comment ${commentId}: ${error}"}`);
    }


}

module.exports = {
    getCommentByCommentId,
    getCommentsByRecipeId,
    getCommentsByUserId,
    createNewComment,
    updateComment,
    deleteComment
}
