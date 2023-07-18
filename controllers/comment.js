const mongo = require('../db/connect');
const modify = require('./modification');
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
        res.status(201).json({insertedId: result.insertedId});

        await modify.addNewMod("comment", comment.userId, "Created comment");
            
    } catch (error) {
        res.status(500).json("{error: Error creating comment: " + error + "}");
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

        const commentRecord = await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('comment').find({_id: commentId}).toArray();

        // update document and display results
        const result = await mongo.getConnection()
            .db('flavor-hub')
            .collection('comment')
            .updateOne({_id: commentId}, {$set: {text: text}});
        res.status(200).json({acknowledged: result.acknowledged, modifiedCount: result.modifiedCount});

        await modify.addNewMod("comment", commentRecord[0].userId, "Modified comment");
    } catch (error) {
        res.status(501).json("{error: Error updating comment: " + error + "}");
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

        const commentRecord = await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('comment').find({_id: commentId});
        commentRecord.toArray().then((lists) => {
            res.status(200).json(lists[0]);
        });

        // delete document from collection 
        const result = await mongo.getConnection()
            .db('flavor-hub')
            .collection('comment')
            .deleteOne({_id: commentId});
            res.status(200).json(result);
        
        await modify.addNewMod("comment", commentRecord.userId, "Deleted comment");
        } catch (error) {
        res.status(502).json(error);
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
