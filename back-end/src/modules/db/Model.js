const extractDataValues = (result) => result.dataValues;

class Model {
  static findOne(query) {
    return this.Model.findOne({ where: query });
  }

  static create(data) {
    return this.Model.create(data);
  }

  static findAll() {
    return this.Model.findAll()
      .then((result) => result.map(extractDataValues));
  }
}

module.exports = Model;
