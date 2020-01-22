import { Component, OnInit } from "@angular/core";

import { PlaylistService } from "../playlist.service";
import { Playlist } from "../interfaces/Playlist";

@Component({
  selector: "app-play-list-task",
  templateUrl: "./play-list-task.component.html",
  styleUrls: ["./play-list-task.component.css"]
})
export class PlayListTaskComponent implements OnInit {
  playlists: Playlist[];
  totalSongs: Number = 0;
  totalMinutes: Number = 0;

  constructor(private plyService: PlaylistService) {}

  getItems(): void {
    this.plyService.getAllPly().subscribe(ply => {
      this.playlists = ply;
      console.log(this.playlists);
    });
  }

  ngOnInit() {
    this.getItems();
  }
}
