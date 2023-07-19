const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function getAllMod(req, res, next)
{
    // #swagger.tags = ['Modifications']

    try
    {
        const result = await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('modification')
            .find();
        result.toArray().then((lists) => 
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
            return true;
        });
    }
    catch(error)
    {
        res.status(400).json({message:"Get all mods error, unexpected"})
    }
}

async function getModById(req, res, next)
{
    // #swagger.tags = ['Modifications']

    if(!ObjectId.isValid(req.params.modId))
    {
        ('Invalid ID');

        const modId = new ObjectId(req.params.modId);
        const result = await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('modification')
            .find({_id: modId});
        result.toArray().then((lists) => 
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } 
}

async function getModByUserId(req, res, next)
{
    // #swagger.tags = ['Modifications']

    if (!ObjectId.isValid(req.params.userId)) 
    {
        ('Invalid ID');
    
    }
        const userId = new ObjectId(req.params.userId);
        const result = await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('modification')
            .find({userId: userId});
        result.toArray().then((lists) => 
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });

    
}

async function addNewMod(collection, userId, type)
{
    // #swagger.tags = ['Modifications']

    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    let today_date = `${month}/${day}/${year}`;

    const modified =
    {
        date: today_date,
        modified_collection: collection,
        modified_type: type,
        userId: userId
    };
    const mod = await mongo
        .getConnection()
        .db('flavor-hub')
        .collection('modification')
        .insertOne(modified);
}

async function updateModById(req, res)
{
    // #swagger.tags = ['Modifications']

    try
    {
        if(!ObjectId.isValid(req.params.modId)) 
        {
            throw new Error('Invalid ID');
        }

        const modId = new ObjectId(req.params.modId);
        
        const modified = {
            date: req.body.today_date,
            modified_collection: req.body.collection,
            modified_type: req.body.type,
            userId: req.body.userId
        };
        const response = await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('modification')
            .replaceOne({ _id: modId }, modified);

        console.log(response);
        if (response.modifiedCount > 0)
        {
            res.status(204).send(response);
            addNewMod("Modifications", "123456", "Update Modifications");
        } 
        else 
        {
            res.status(500).json(response.error || 'Some error occurred while updating the contact.');
        }
    }
    catch(error)
    {
        res.status(400).json({message:"Update ModById error, unexpected"});
    }
}

async function deleteModById(req, res, next)
{
    // #swagger.tags = ['Modifications']

    try
    {
        if (!ObjectId.isValid(req.params.modId)) 
        {
            throw new Error('Invalid ID');
        }
        const modId = new ObjectId(req.params.modId);
        const userId = "Temp1648284"
        const response = await mongo
        .getConnection()
        .db('flavor-hub')
        .collection('modification')
        .deleteOne({ _id: modId }, true);
        console.log(response);
        if (response.deletedCount > 0) 
        {
            res.status(200).send();
            addNewMod("Modification", userId, "Modification Deleted");
        } 
        else 
        {
            res.status(500).json(response.error || 'Some error occurred while deleting the mod.');
        }
    }
    catch(error)
    {
        res.status(400).json({message:error.message});
    }
}

async function getModByType(req, res, next)
{
    // #swagger.tags = ['Modifications']

    if (!ObjectId.isValid(req.params.modified_type)) 
    {
        ('Invalid type ID');
        
        const typeId = new ObjectId(req.params.modified_type);
        const result = await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('modification')
            .find({modified_type: typeId});
        result.toArray().then((lists) => 
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    }
}

module.exports = 
{
    getAllMod,
    getModById,
    getModByUserId,
    addNewMod,
    updateModById,
    deleteModById,
    getModByType
}