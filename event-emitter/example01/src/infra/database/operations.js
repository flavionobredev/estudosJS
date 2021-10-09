class Operations {
  #schema = null;
  #instance = null;
  #data = null;

  constructor(instance, schema) {
    this.#schema = schema;
    this.#instance = instance;
    this.#data = data;
  }

  find() {
    return this.#data;
  }
}

module.exports = {
  Operations,
};
