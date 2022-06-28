import Groups from "./groups.js";
import Teachers from "./teachers.js";
import LMS from "./lms.js";
import Pupils from "./pupils.js";
import { Subject } from "./lms.js";

class Gradebooks {
  constructor(groups, teachers, lms) {
    this.groups = groups;
    this.teachers = teachers;
    this.lms = lms;
    this.db = new Map();
    this.counter = 0;
  }
  add(groupId) {
    this.counter++;
    const id = this.counter.toString();
    const gradebook = {
      id: id,
      groupId: groupId,
      records: [],
    };
    this.db.set(id, gradebook);
    return gradebook;
  }

  clear() {
    this.db.clear();
  }

  addRecord(gradebookId, record) {
    const gradebooks = this.db.get(gradebookId);
    gradebooks.records.push(record);
  }

  read(gradebookId, pupilId) {
    const gradebook = this.db.get(gradebookId);
    const group = this.groups.read(gradebook.groupId);
    const pupil = group.pupils.find((pupil) => (pupil.id = pupilId));
    const changedRecords = gradebook.records.map((record) => {
      const teacher = this.teachers.read(record.teacherId);
      const subject = this.lms.read(record.subjectId);

      return {
        teacher: `${teacher.name.first} ${teacher.name.last}`,
        subject: `${subject.title}`,
        lesson: record.lesson,
        mark: record.mark,
      };
    });
    return {
      name: `${pupil.name.first} ${pupil.name.last}`,
      records: changedRecords,
    };
  }

  readAll() {
    const gradebook = this.db.get(gradebookId);
    const group = this.groups.read(gradebook.groupId);
    const array = [];
    const pupils = group.readAll();
    for (let element of pupils) {

    }
    return array;
  }
}

const groups = new Groups();
const teachers = new Teachers();
const teacherId = teachers.add({
  name: {
    first: "Elizabeth",
    last: "Holmes",
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
});
const lms = new LMS();
const subject = new Subject({
  title: "History",
  lessons: 24,
});
lms.add(subject);
const groupId = groups.add(2);
const pupils = new Pupils();
const pupilId = pupils.add({
  name: {
    first: "Oliver",
    last: "Black",
  },
  dateOfBirth: "12-12-2020", // format date

  phones: [
    {
      phone: "string",
      primary: true,
    },
  ],
  sex: "female", // male or female

  description: "string",
});
groups.addPupil(groupId, pupils.read(pupilId));
const gradebooks = new Gradebooks(groups, teachers, lms);
const gradebook = gradebooks.add(groupId);
const record = {
  pupilId: pupilId,
  teacherId: teacherId,
  subjectId: subject.Id,
  lesson: 1,
  mark: 9,
};
const addRecord = gradebooks.addRecord(gradebook.id, record);
const oliver = gradebooks.read(gradebook.id, pupilId);
// gradebooks.clear();
console.log(oliver);
