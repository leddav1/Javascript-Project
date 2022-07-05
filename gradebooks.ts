type Gradebook = {name: {first: string, last: string}, subjects: string, description?: string}
 export default class Gradebooks {
  db = new Map<string, Gradebook>();
  constructor(groups: Groups, teachers: Teachers, lms: LMS) {
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

  readAll(gradebookId) {
    const gradebook = this.db.get(gradebookId);
    return gradebook.records;
  }
}

