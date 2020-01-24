import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";

import { PlaylistService } from "../playlist.service";
import { Playlist } from "../interfaces/Playlist";
import { Song } from "../interfaces/Song";

declare var M: any;

@Component({
  selector: "app-play-list-task",
  templateUrl: "./play-list-task.component.html",
  styleUrls: ["./play-list-task.component.css"]
})
export class PlayListTaskComponent implements OnInit {
  playlists: Playlist[];
  plyForm: FormGroup;
  editing: Boolean;
  each: Playlist;

  constructor(private fb: FormBuilder, private plyService: PlaylistService) {}

  ngOnInit() {
    this.initForm();
    this.initItems();
    this.initModal();
  }

  get playlistForm() {
    return this.plyForm.get("songs") as FormArray;
  }

  initModal() {
    let modal = document.querySelectorAll(".modal");
    let init = M.Modal.init(modal);
  }

  editingForm(params) {
    this.editing = true;
    this.each = params;
    this.plyForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      songs: this.fb.array(params.songs.map(v => this.fb.group(v)))
    });
    const { name, description, songs } = params;
    this.plyForm.patchValue({
      name,
      description,
      songs
    });
  }

  initForm() {
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

  initItems(): void {
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
    const durationAndLength = this.reduce(this.plyForm.value.songs);
    this.playlists.unshift({
      ...this.plyForm.value,
      ...durationAndLength
    });
    this.initForm();
  }

  onEdit() {
    const index = this.playlists.indexOf(
      this.playlists.find(i => i.name == this.each.name)
    );

    const durationAndLength = this.reduce(this.plyForm.value.songs);
    this.playlists.splice(index, 1, {
      ...this.plyForm.value,
      ...durationAndLength
    });
    this.initForm();
    this.editing = false;
  }

  onDelete({ name }) {
    return (this.playlists = this.playlists.filter(v => v.name !== name));
  }

  reduce(params: Song[]) {
    let totalDur = 0;
    return params.reduce((acc, val, _, arr) => {
      acc["totalDuration"] = totalDur += val.duration;
      acc["totalSongs"] = arr.length;
      return acc;
    }, {});
  }
}
