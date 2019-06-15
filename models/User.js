//a ideia dos models é de ter os campos que você irá utilizar no seu backend
//ja que o mongoose é NOSQL, então não vai ter uma estrutura

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create schema(os campos)

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);