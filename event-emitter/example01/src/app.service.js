const Database = require("./infra/database");
const { UserSchema } = require("./infra/database/schemas/user.schema");

class AppService {
  data;

  /**
   * Conexão com o banco de dados
   * @param { Database } db
   */
  constructor(db) {
    this.data = db.data;
  }

  getAllUsers() {
    return this.data;
  }
}

module.exports = {
  AppService,
};
