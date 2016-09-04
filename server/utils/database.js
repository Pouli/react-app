'use strict';

const bluebird = require('bluebird');
const MongoClient = bluebird.promisifyAll(require('mongodb').MongoClient);
let db;

exports.connect = () => {
    return MongoClient.connectAsync('mongodb://localhost:27017/newer')
        .then(database => db = database);
};

exports.find = (collection, selector) => {
    return db.collection(collection).find(selector).toArray();
};

exports.findOne = (collection, selector) => {
    return db.collection(collection).findOne(selector).toArray();
};

exports.findById = (collection, id) => {
    return db.collection(collection).findById(id);
};

exports.insert = (collection, doc) => {
    return db.collection(collection).insertOne(doc);
};