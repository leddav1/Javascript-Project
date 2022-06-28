export default class Groups {
    counter = 0;
    db = new Map();
    add(room) {
        this.counter++;
        const id = this.counter.toString();
        const group = {
            id: id,
            room: room,
            pupils: []
        }
        this.db.set(id, group);
        return id;       
    }

    addPupil(id, pupil) {
        const group = this.db.get(id);
        group.pupils.push(pupil);
    }

    removePupil(id, pupilId) {
        const group = this.db.get(id);
        const index = group.pupils.findIndex(pupil => pupil.id === pupilId);
        group.pupils.splice(index, 1);
    }

    update(id, update) {
        const group = this.db.get(id);
        group.room = update.room;
    }

    read(id) {
        return this.db.get(id);
    }

    readAll() {
        return Array.from(this.db.values());
    }
}

