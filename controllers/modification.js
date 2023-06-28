const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function getAllMod(req, res, next)
{
    // #swagger.tags = ['Modifications']
    res.send('get all modifications');
}

async function getModById(req, res, next)
{
    // #swagger.tags = ['Modifications']
    res.send('get modification by mod id');
}

async function getModByUserId(req, res, next)
{
    // #swagger.tags = ['Modifications']
    res.send('get modification by user id');
}

async function addNewMod(req, res, next)
{
    // #swagger.tags = ['Modifications']
    res.send('create new mod');
}

async function updateModById(req, res, next)
{
    // #swagger.tags = ['Modifications']
    res.send('update modification by mod id');
}

async function deleteModById(req, res, next)
{
    // #swagger.tags = ['Modifications']
    res.send('delete modification by mod id');
}

async function getModByType(req, res, next)
{
    // #swagger.tags = ['Modifications']
    res.send('get modification by recipe category');
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