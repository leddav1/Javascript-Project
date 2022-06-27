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

const history = new Subject({
  title: 'History',
  lessons: 24
});
// When creating a new instance, you should assign unique ID to it.        
history.id // will return subjectId

const lms = new LMS();
lms.add(history); // should add subject to lms
// lms.remove(history); // should remove subject from lms

// will return true or false. Answer will be true if such subject exists in LMS.
lms.verify(history);

// will return array of registered subjects
// each subject must contain: id, title, lessons and description propertties.        
lms.readAll();

console.log(lms.readAll());

