import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  declarations: [AppComponent, ItemListComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
