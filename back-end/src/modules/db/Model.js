class Model {
  static findOne(query) {
    return this.Model.findOne({ where: query });
  }

  static create(data) {
    return this.Model.create(data);
  }
}

module.exports = Model;
