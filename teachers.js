class Teachers {
  counter = 0;
  db = new Map();
  add(data) {
    this.counter++;
    this.validate(data);
    const id = this.counter.toString();
    this.db.set(id, data);
    return 'added: ' + id;
  }

  read(id) {
    if (typeof id !== 'string') {
      throw new Error (`id should be a string`);
    }
    const result = {...this.db.get(id), id:id};
    return result;
  }

  update(id, data) {
    if (typeof id !== 'string') {
      throw new Error(`id should be a string`);
    }
    this.db.set(id, data);
    return 'updated: ' + id;
  }

  remove (id) {
    if (typeof id !== 'string') {
      throw new Error(`id should be a string`);
    }
    if (this.db.delete(id)) {
      return 'removed: ' + id;
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

    if (!Array.isArray(data.emails) || data.emails.length === 0) {
      throw new Error(`emails field should not be empty`);
    }
    for (let email of data.emails) {
      if (typeof email.email !== "string") {
        throw new Error(`email type should be a string`);
      }
      if (typeof email.primary !== "boolean") {
        throw new Error(`it should be a boolean`);
      }
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
    if (typeof data.sex !== 'string') {
        throw new Error ('type should be a string')
    }
    if (data.sex !== "male" && data.sex !== "female") {
      throw new Error ('indicate male or female')
    }

    if (!Array.isArray(data.subjects) || data.subjects.length === 0) {
      throw new Error ('subjects field should not be empty')
    }
    for (let subject of data.subjects) {
      if (typeof subject.subject !== 'string') {
        throw new Error ('type should be a string')
      }
    }
    if (typeof data.description !== 'undefined' 
    && typeof data.description !== 'string') {
      throw new Error(`parameter type should be a string`);
    }
  }
}


const teachers = new Teachers();
let x = {
  name: {
    first: "string",
    last: "string",
  },
  dateOfBirth: "12-12-2020", // format date
  emails: [
    {
      email: "string",
      primary: true,
    },
  ],
  phones: [
    {
      phone: "string",
      primary: true,
    },
  ],
  sex: "female", // male or female
  subjects: [
    {
      subject: "string", // just name property of subject.
    },
  ],
  description: "string",
};

const teacherId = teachers.add(x);
const teacher = teachers.read(teacherId);

let y = {
  name: {
    first: "string",
    last: "string",
  },
  dateOfBirth: "10-12-2020", // format date
  emails: [
    {
      email: "string",
      primary: true,
    },
  ],
  phones: [
    {
      phone: "string",
      primary: true,
    },
  ],
  sex: "female", // male or female
  subjects: [
    {
      subject: "string", // just name property of subject.
    },
  ],
  description: "string",
};
const update = teachers.update(teacherId, y);
const remove = teachers.remove(teacherId);
console.log(remove);
