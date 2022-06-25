class Teachers {
static counter = 0;
  db = new Map();
  add(data) {
    if (
      data.name &&
      (typeof data.name.first !== "string" ||
        typeof data.name.last !== "string")
    ) {
      throw new Error (`parameter type should be a string`);
    }
    this.db.set(data.id, data);

    if (typeof data.dateOfBirth !== "string") {
        throw new Error (`parameter type should be a string`);
    } 
    const regexExp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (!regexExp.test(data.dateOfBirth)) {
        throw new Error (`incorrect format`);
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
   return Teachers.counter;
  }
}
const teachers = new Teachers();
let x = { "name": {
      "first": "string",
      "last": "string"
    },
    "dateOfBirth": "12-12-2020", // format date
    "emails": [
      {
        "email": "string",
        "primary": true
      }
    ],
    "phones": [
      {
        "phone": "string",
        "primary": "boolean"
      }
    ],
    "sex": "string", // male or female
    "subjects": [
      {
        "subject": "string" // just name property of subject.
      }
    ],
    "description": "string",
  }
  const teacherId = teachers.add(x);
  console.log(teacherId);
