import Groups from "./groups.js";
import Teachers from "./teachers.js";
import LMS from "./lms.js";
import Pupils from "./pupils.js";
import { Subject } from "./lms.js";
import Gradebooks from "./gradebooks.js";

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
  subjectId: subject.id,
  lesson: 1,
  mark: 9,
};
const addRecord = gradebooks.addRecord(gradebook.id, record);
const oliver = gradebooks.read(gradebook.id, pupilId);
// gradebooks.clear();
console.log(gradebooks.readAll(gradebook.id));