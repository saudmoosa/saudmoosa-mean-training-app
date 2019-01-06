const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const Schema = mongoose.Schema;

let IssueSchema = new Schema({
    title: {
        type: String
    },
    responsible: {
        type: String
    },
    description: {
        type: String
    },
    severity:{
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    }
});

const Issue = module.exports = mongoose.model('Issue', IssueSchema);