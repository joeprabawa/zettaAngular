import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { PLAYLISTS } from "./mock-data/playlists";
import { Playlist } from "./interfaces/Playlist";

@Injectable({
  providedIn: "root"
})
export class PlaylistService {
  getAllPly(): Observable<Playlist[]> {
    return of(PLAYLISTS);
  }
  constructor() {}
}
