import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

import { PLAYLISTS } from "../mock-data/playlists";
import { Playlist } from "../interfaces/Playlist";
import { reducing } from "../helpers/reduce";
import { Song } from "../interfaces/Song";

@Injectable({
  providedIn: "root"
})
export class PlaylistService {
  constructor(private db: AngularFirestore) {}
  dbRef = this.db.collection<Playlist>("playlists");

  getAllPly(): Observable<Playlist[]> {
    return this.dbRef.valueChanges();
  }

  submit(songs: Song[], formVals: any) {
    const durationAndLength = reducing(songs, "playlist");
    const id = this.db.createId();
    const doc = { ...formVals, ...durationAndLength, id };
    this.dbRef.doc(id).set(doc);
    return PLAYLISTS.unshift(doc);
  }

  edit(each: Playlist, formVals: Playlist) {
    const durationAndLength = reducing(formVals.songs, "playlist");
    const doc = { ...formVals, ...durationAndLength };

    this.dbRef.snapshotChanges().subscribe(vals => {
      const { id } = vals.find(
        val => val.payload.doc.id === each.id
      ).payload.doc;
      this.dbRef.doc(id).update(doc);
    });
  }

  async delete(id: any) {
    const deleting = await this.dbRef.doc(id).delete();
    return deleting;
  }
}
