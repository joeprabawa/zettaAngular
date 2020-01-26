import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { PLAYLISTS } from "../mock-data/playlists";
import { Playlist } from "../interfaces/Playlist";
import { reducing } from "../helpers/reduce";
import { Song } from "../interfaces/Song";

@Injectable({
  providedIn: "root"
})
export class PlaylistService {
  getAllPly(): Observable<Playlist[]> {
    return of(PLAYLISTS);
  }

  submit(songs: Song[], formVals: any) {
    console.log(songs, formVals);
    const durationAndLength = reducing(songs);
    return PLAYLISTS.unshift({
      ...formVals,
      ...durationAndLength
    });
  }

  edit(each: Playlist, formVals: Playlist) {
    const index = PLAYLISTS.indexOf(PLAYLISTS.find(i => i.name == each.name));
    const durationAndLength = reducing(formVals.songs);
    return PLAYLISTS.splice(index, 1, {
      ...formVals,
      ...durationAndLength
    });
  }
  constructor() {}
}
