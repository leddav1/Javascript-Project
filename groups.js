class Groups {
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

const room = 236;
const groups = new Groups();

// Create a new group. add methods takes integer as a parameter. returns id of group
const groupId = groups.add(room);
const pupil = {
    id: 1
}
const pupil2 = {
    id: 3
}

// Add this pupil to this group
groups.addPupil(groupId, pupil);
groups.addPupil(groupId, pupil2);

// Remove this pupil from this group
groups.removePupil(groupId, pupil.id);

// Update room for this group
groups.update(groupId, {
  room: 237
});

// Read information about group
console.log(groups.read(groupId));

// It will return array of groups
console.log(groups.readAll());
