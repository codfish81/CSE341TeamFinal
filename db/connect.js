require('dotenv').config();
const {MongoClient} = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let _db;

const connect = (callback) => {
    if (_db) {
        console.log("Db is already connected");
        return callback(null, _db);
    }
    MongoClient.connect(uri)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getConnection = () => {
    if(!_db){
        throw Error("Db has not been connected yet!");
    }
    return _db;
}

module.exports = {
    connect,
    getConnection,
}