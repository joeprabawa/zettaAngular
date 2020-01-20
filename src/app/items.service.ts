import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Items } from "./interface";
import { ITEMS } from "./items";

@Injectable({
  providedIn: "root"
})
export class ItemsService {
  getAllItems(): Observable<Items[]> {
    return of(ITEMS);
  }
  constructor() {}
}
