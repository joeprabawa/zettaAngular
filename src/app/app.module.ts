import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import { ItemListComponent } from "./item-list/item-list.component";
import { PlayListTaskComponent } from "./play-list-task/play-list-task.component";

// Initialize Routes
const appRoutes: Routes = [
  { path: "", component: ItemListComponent },
  { path: "task-two", component: PlayListTaskComponent }
];

@NgModule({
  declarations: [AppComponent, ItemListComponent, PlayListTaskComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
