const moongose = require('mongoose');

moongose.Promise = global.Promise;

const db = {};

db.connect = moongose.connect;
db.config  = require('../config/db.config');
db.url     = `mongodb+srv://${db.config.USER}:${db.config.PASS}@${db.config.HOST}/${db.config.DB}${db.config.QUERY}`;

db.userModel = require('../models/user.model.js');
db.roleModel = require('../models/role.model.js');
db.roles = require('./roles');
db.initial = require('./initial.js')

module.exports = db;


