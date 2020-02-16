import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { Playlist } from "../interfaces/Playlist";
import { Song } from "../interfaces/Song";
import { reducing } from "../helpers/reduce";
declare var M: any;

@Injectable({
  providedIn: "root"
})
export class PlaylistService {
  private dbRef: AngularFirestoreCollection<Playlist>;

  constructor(private db: AngularFirestore) {
    this.dbRef = this.db.collection<Playlist>("playlists");
  }

  getAllPly(): Observable<Playlist[]> {
    return this.dbRef.valueChanges({ idField: "id" });
  }

  async submit(songs: Song[], formVals: any) {
    const durationAndLength = reducing(songs, "playlist");
    const doc = { ...formVals, ...durationAndLength };
    const data = await this.dbRef.add(doc);
    return data.onSnapshot(obs => {
      const { name } = obs.data();
      M.toast({
        html: ` <i class="material-icons left">done</i>${name} Success Added!`,
        classes: "rounded green lighten-1"
      });
    });
  }

  edit(each: Playlist, formVals: Playlist) {
    const durationAndLength = reducing(formVals.songs, "playlist");
    const doc = { ...formVals, ...durationAndLength };
    const source = this.getAllPly().pipe(take(1));
    const subscriptions = source.subscribe(vals => {
      const { id } = vals.find(({ id }) => id === each.id);
      return this.dbRef.doc(id.toString()).set({ ...doc, merge: true });
    });
    M.toast({
      html: ` <i class="material-icons left">done</i>Success Edited!`,
      classes: "rounded green lighten-1"
    });
    console.log(subscriptions);
    return subscriptions;
  }

  delete(uid: any) {
    this.dbRef.valueChanges({ idField: "id" }).subscribe(vals => {
      const { id, name } = vals.find(v => v.id === uid);
      M.toast({
        html: ` <i class="material-icons left">block</i> ID : ${id
          .toString()
          .toLowerCase()} - ${name} Removed!`,
        classes: "rounded red lighten-1"
      });
      return this.dbRef.doc(id).delete();
    });
  }
}
