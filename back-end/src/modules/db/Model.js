class Model {
  static findOne(query) {
    this.Model.findOne({ where: query });
  }
}

module.exports = Model;
