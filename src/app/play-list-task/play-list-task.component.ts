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
  loading: boolean = false;
  playlists: Playlist[];
  plyForm: FormGroup;
  editing: Boolean;
  each: Playlist;
  song = this.fb.group({
    title: ["", Validators.required],
    artist: ["", Validators.required],
    duration: ["", Validators.required]
  });

  constructor(private fb: FormBuilder, private plyService: PlaylistService) {}

  ngOnInit() {
    this.initForm();
    this.initItems();
    this.initModal();
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }

  initItems() {
    this.loading = true;
    return this.plyService.getAllPly().subscribe(ply => {
      this.playlists = ply;
      this.loading = false;
    });
  }

  get playlistForm() {
    return this.plyForm.get("songs") as FormArray;
  }

  initModal() {
    let modal = document.querySelectorAll(".modal");
    M.Modal.init(modal);
  }

  initForm(params?: Playlist) {
    return (this.plyForm = this.fb.group({
      name: ["", Validators.required],
      by: ["", Validators.required],
      description: ["", Validators.required],
      songs: !params
        ? this.fb.array([this.song])
        : this.fb.array(params.songs.map((v: Song) => this.fb.group(v)))
    }));
  }

  editingForm(params: Playlist) {
    this.editing = true;
    this.each = params;
    const { name, by, description, songs } = params;
    this.plyForm.patchValue({
      name,
      by,
      description,
      songs
    });
    this.initForm(params);
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
    this.plyService.submit(this.plyForm.value.songs, this.plyForm.value);
    this.initForm();
  }

  onEdit() {
    this.plyService.edit(this.each, this.plyForm.value);
    this.initForm();
    this.editing = false;
  }

  onDelete({ name, id }: Playlist) {
    this.plyService.delete(id);
    return (this.playlists = this.playlists.filter(v => v.name !== name));
  }

  cancel() {
    return this.initForm();
  }
}
