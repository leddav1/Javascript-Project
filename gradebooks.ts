import Groups from "./groups";
import Teachers from "./teachers";
import LMS from "./lms";

type Record = {
  pupilId: string,
  teacherId: string,
  subjectId: string,
  lesson: number,
  mark: number
}

type Gradebook = {id: string, 
  groupId: string,
  records: Record[]
}
 export default class Gradebooks {
  db = new Map<string, Gradebook>();
  groups: Groups;
  teachers: Teachers;
  lms: LMS;
  counter: number
  constructor(groups: Groups, teachers: Teachers, lms: LMS) {
    this.groups = groups;
    this.teachers = teachers;
    this.lms = lms;
    this.counter = 0;
  }
  add(groupId: string) {
    this.counter++;
    const id = this.counter.toString();
    const gradebook: Gradebook = {
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

  addRecord(gradebookId: string, record: Record) {
    const gradebook = this.db.get(gradebookId);
    if (!gradebook) {
      throw new Error(`gradebook not found`)
    }
    gradebook.records.push(record);
  }

  read(gradebookId: string, pupilId: string) {
    const gradebook = this.db.get(gradebookId);
    if (!gradebook) {
      throw new Error(`gradebook not found`)
    }
    const group = this.groups.read(gradebook.groupId);
    if (!group) {
      throw new Error(`group not found`)
    }
    const pupil = group.pupils.find((pupil) => (pupil.id = pupilId));
    if (!pupil) {
      throw new Error(`pupil not found`)
    }
    const changedRecords = gradebook.records.map((record) => {
      const teacher = this.teachers.read(record.teacherId);
      if (!teacher) {
        throw new Error(`teacher not found`)
      }
      const subject = this.lms.read(record.subjectId);

      if (!teacher.name) {
        throw new Error(`teacher.name not found`)
      }
      return {
        teacher: `${teacher?.name?.first} ${teacher?.name?.last}`,
        subject: `${subject?.title}`,
        lesson: record.lesson,
        mark: record.mark,
      };
    });

    return {
      name: `${pupil?.name.first} ${pupil?.name.last}`,
      records: changedRecords,
    };
  }

  readAll(gradebookId: string) {
    const gradebook = this.db.get(gradebookId);
    if (!gradebook) {
      throw new Error(`gradebook not found`)
    }
    return gradebook.records;
  }
}

