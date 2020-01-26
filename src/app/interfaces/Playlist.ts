import { Song } from "./Song";

export interface Playlist {
  id?: String;
  by: String;
  name: string;
  totalDuration?: number;
  totalSongs?: number;
  description: string;
  songs: Song[];
}
