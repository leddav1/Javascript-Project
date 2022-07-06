import {Pupil} from "./pupils"
type Group = {id: string, room: number, pupils: Pupil[]}
export default class Groups {
    counter = 0;
    db = new Map<string, Group>();
    add(room:number) {
        this.counter++;
        const id = this.counter.toString();
        const group: Group = {
            id: id,
            room: room,
            pupils: []
        }
        this.db.set(id, group);
        return id;       
    }

    addPupil(id: string, pupil: Pupil) {
        const group = this.read(id);
        group.pupils.push(pupil);
    }

    removePupil(id: string, pupilId: string) {
        const group = this.read(id);
        const index = group.pupils.findIndex((pupil: Pupil) => pupil.id === pupilId);
        group.pupils.splice(index, 1);
    }

    update(id: string, update: {room: number}) {
        const group = this.read(id);
        group.room = update.room;
    }

    read(id: string) {
        const group = this.db.get(id);
        if(!group) {
            throw new Error(`group not found`)
        }
        return group;
    }

    readAll() {
        return Array.from(this.db.values());
    }
}


