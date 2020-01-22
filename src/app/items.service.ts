import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Items } from "./interfaces/Item";
import { ITEMS } from "./mock-data/items";

@Injectable({
  providedIn: "root"
})
export class ItemsService {
  getAllItems(): Observable<Items[]> {
    return of(ITEMS);
  }
  constructor() {}
}
