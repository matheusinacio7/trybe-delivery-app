const Model = require('../Model');
const { user: UserModel } = require('../../../database/models');

class User extends Model { }

User.Model = UserModel;

module.exports = User;
