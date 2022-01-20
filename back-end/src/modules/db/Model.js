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

  static search(query) {
    return this.Model.findAll({ where: query })
      .then((result) => result.map(extractDataValues));
  }

  static update({ id, newValues }) {
    return this.Model.update(newValues, { where: { id } });
  }
}

module.exports = Model;
