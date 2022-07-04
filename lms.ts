
export default class LMS {
  data = new Map<string, Subject>();
  add(subject: Subject) {
    this.data.set(subject.id, subject);
  }
  remove(subject: Subject) {
    this.data.delete(subject.id);
  }
  verify(subject: Subject) {
    return this.data.has(subject.id);
  }
  read(subjectId: string) {
    return this.data.get(subjectId);
  }
  readAll() {
    return Array.from(this.data.values());
  }
}

type SubjectSchema = {title: string, lessons: number, description?: string};
export class Subject {
  static counter = 0;
  id: string;
  title: string;
  lessons: number;
  description?: string;
  constructor(obj: SubjectSchema) {
    this.id = Subject.counter.toString();
    this.title = obj.title;
    this.lessons = obj.lessons;
    if (obj.description) {
    this.description = obj.description;}
    Subject.counter++;
  }
}

