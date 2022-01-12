const Model = require('../Model');
const { User: UserModel } = require('../../../database/models');

class User extends Model {
  static Model = UserModel;
}

module.exports = User;
