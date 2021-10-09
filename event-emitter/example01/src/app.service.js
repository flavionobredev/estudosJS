const Database = require("./infra/database");
const { UserSchema } = require("./infra/database/schemas/user.schema");

class AppService {
  #userModel;

  /**
   * Conexão com o banco de dados
   * @param { Database } db
   */
  constructor(db) {
    this.#userModel = Database.ModelBySchema(UserSchema);
  }

  getAllUsers() {
    return this.#userModel.find();
  }
}

module.exports = {
  AppService,
};
