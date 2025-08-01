export default class LMS {
  data = new Map();
  add(subject) {
    this.data.set(subject.id, subject);
  }
  remove(subject) {
    this.data.delete(subject.id);
  }
  verify(subject) {
    return this.data.has(subject.id);
  }
  read(subjectId) {
    return this.data.get(subjectId);
  }
  readAll() {
    return Array.from(this.data.values());
  }
}

export class Subject {
  static counter = 0;
  constructor(obj) {
    if (typeof obj.title !== 'string'
    || typeof obj.lessons !== 'number'
    || typeof obj.description !== 'undefined' && typeof obj.description !== 'string') {
      throw new Error(`parameter type should be a string`);
    }
    this.id = Subject.counter.toString();
    this.title = obj.title;
    this.lessons = obj.lessons;
    if (obj.description) {
    this.description = obj.description;}
    Subject.counter++;
  }
}

