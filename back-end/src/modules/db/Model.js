class Model {
  static findOne(query) {
    return this.Model.findOne({ where: query });
  }
}

module.exports = Model;
