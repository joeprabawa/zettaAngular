import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { Playlist } from "../interfaces/Playlist";
import { Song } from "../interfaces/Song";
import { reducing } from "../helpers/reduce";

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

  submit(songs: Song[], formVals: any) {
    const durationAndLength = reducing(songs, "playlist");
    const doc = { ...formVals, ...durationAndLength };
    this.dbRef.add(doc);
  }

  edit(each: Playlist, formVals: Playlist) {
    const durationAndLength = reducing(formVals.songs, "playlist");
    const doc = { ...formVals, ...durationAndLength };
    this.dbRef.valueChanges({ idField: "id" }).subscribe(vals => {
      const { id } = vals.find(({ id }) => id === each.id);
      return this.dbRef.doc(id).update(doc);
    });
  }

  async delete(id: any) {
    const deleting = await this.dbRef.doc(id).delete();
    return deleting;
  }
}
