export default class Pupils {
  counter = 0;
  database = new Map();
  add(data) {
    this.counter++;
    this.validate(data);
    const id = this.counter.toString();
    this.database.set(id, data);
    return id;
  }

  read(id) {
    if (typeof id !== "string") {
      throw new Error(`id should be a string`);
    }
    const result = { ...this.database.get(id), id: id };
    return result;
  }

  update(id, data) {
    if (typeof id !== 'string') {
        throw new Error(`id should be a string`);
      }
      this.database.set(id, data);
      return id;
  }

  remove (id) {
    if (typeof id !== 'string') {
      throw new Error(`id should be a string`);
    }
    if (this.database.delete(id)) {
      return id;
    } else {
      throw new Error(`element could not be removed`);
    }
  }

  validate(data) {
    if (
      data.name &&
      (typeof data.name.first !== "string" ||
        typeof data.name.last !== "string")
    ) {
      throw new Error(`parameter type should be a string`);
    }

    if (typeof data.dateOfBirth !== "string") {
      throw new Error(`parameter type should be a string`);
    }
    const regexExp =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (!regexExp.test(data.dateOfBirth)) {
      throw new Error(`incorrect format`);
    }

    if (!Array.isArray(data.phones) || data.phones.length === 0) {
      throw new Error(`phones field should not be empty`);
    }
    for (let phone of data.phones) {
      if (typeof phone.phone !== "string") {
        throw new Error(`phone type should be a string`);
      }
      if (typeof phone.primary !== "boolean") {
        throw new Error(`it should be a boolean`);
      }
    }
    if (typeof data.sex !== "string") {
      throw new Error("type should be a string");
    }
    if (data.sex !== "male" && data.sex !== "female") {
      throw new Error("indicate male or female");
    }

    if (
      typeof data.description !== "undefined" &&
      typeof data.description !== "string"
    ) {
      throw new Error(`parameter type should be a string`);
    }
  }
}

