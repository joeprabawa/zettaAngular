import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";

import { PlaylistService } from "../services/playlist.service";
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
  song: FormGroup = this.fb.group({
    title: ["", Validators.required],
    artist: ["", Validators.required],
    duration: ["", Validators.required]
  });

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

  initForm() {
    this.plyForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      songs: this.fb.array([this.song])
    });
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

  initItems(): void {
    this.plyService.getAllPly().subscribe(ply => {
      this.playlists = ply;
    });
  }

  addField() {
    this.playlistForm.push(this.song);
  }

  deleteField(i: number) {
    this.playlistForm.removeAt(i);
  }

  onSubmit() {
    this.plyService.submit(this.plyForm.value.songs, this.plyForm.value);
    this.initForm();
  }

  onEdit() {
    this.plyService.edit(this.each, this.plyForm.value);
    this.initForm();
    this.editing = false;
  }

  onDelete({ name }) {
    return (this.playlists = this.playlists.filter(v => v.name !== name));
  }
}
