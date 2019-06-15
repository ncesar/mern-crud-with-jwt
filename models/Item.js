//a ideia dos models é de ter os campos que você irá utilizar no seu backend
//ja que o mongoose é NOSQL, então não vai ter uma estrutura

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create schema(os campos)

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);