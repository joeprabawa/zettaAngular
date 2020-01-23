import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";

import { PlaylistService } from "../playlist.service";
import { Playlist } from "../interfaces/Playlist";

declare var M: any;

@Component({
  selector: "app-play-list-task",
  templateUrl: "./play-list-task.component.html",
  styleUrls: ["./play-list-task.component.css"]
})
export class PlayListTaskComponent implements OnInit {
  playlists: Playlist[];
  totalDur: number = 0;

  plyForm: FormGroup;

  constructor(private fb: FormBuilder, private plyService: PlaylistService) {}

  ngOnInit() {
    // Initiate Form
    this.setForm();

    this.getItems();
    let modal = document.querySelectorAll(".modal");
    let init = M.Modal.init(modal);
  }

  get playlistForm() {
    return this.plyForm.get("songs") as FormArray;
  }

  setForm() {
    this.plyForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      songs: this.fb.array([
        this.fb.group({
          title: ["", Validators.required],
          artist: ["", Validators.required],
          duration: ["", Validators.required]
        })
      ])
    });
  }
  getItems(): void {
    this.plyService.getAllPly().subscribe(ply => {
      this.playlists = ply;
    });
  }
  addField() {
    const song = this.fb.group({
      title: ["", Validators.required],
      artist: ["", Validators.required],
      duration: ["", Validators.required]
    });
    this.playlistForm.push(song);
  }
  deleteField(i: number) {
    this.playlistForm.removeAt(i);
  }
  onSubmit() {
    const durationAndLength = this.plyForm.value.songs.reduce(
      (acc, val, _, arr) => {
        acc["totalDuration"] = this.totalDur += val.duration;
        acc["totalSongs"] = arr.length;
        return acc;
      },
      {}
    );

    this.playlists.unshift({
      ...this.plyForm.value,
      ...durationAndLength
    });

    this.setForm();
  }
}
