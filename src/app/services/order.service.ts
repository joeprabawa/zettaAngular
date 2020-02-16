import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

import { Order } from "../interfaces/Shop";
import { reducing } from "../helpers/reduce";
declare var M: any;

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private dbRef: AngularFirestoreCollection<Order>;
  constructor(private db: AngularFirestore) {
    this.dbRef = this.db.collection<Order>("orders");
  }

  getOrders(): Observable<Order[]> {
    return this.dbRef.valueChanges({ idField: "id" });
  }

  async submitOrder(formVal: Order) {
    const totalPrice = reducing(formVal.items, "shop");
    const doc = { ...formVal, ...totalPrice };
    const data = await this.dbRef.add(doc);
    return data.onSnapshot(obs => {
      const { customerName, items } = obs.data();
      M.toast({
        html: ` <i class="material-icons left">done</i>${items.length} items by ${customerName} Success Added!`,
        classes: "rounded green lighten-1"
      });
    });
  }

  editOrder(formVal: any, each: Order) {
    const totalPrice = reducing(formVal.items, "shop");
    const doc = { ...formVal, ...totalPrice };
    const source = this.getOrders().pipe(take(1));
    const subscriptions = source.subscribe(vals => {
      const { id } = vals.find(({ id }) => id === each.id);
      return this.dbRef.doc(id.toString()).set({ ...doc, merge: true });
    });
    M.toast({
      html: ` <i class="material-icons left">done</i>Success Edited!`,
      classes: "rounded green lighten-1",
      displayLength: 10000
    });
    return subscriptions;
  }

  deleteOrder(args) {
    this.dbRef.valueChanges({ idField: "id" }).subscribe(vals => {
      const { id, customerName } = vals.find(v => v.id === args.id);
      M.toast({
        html: ` <i class="material-icons left">block</i> ID : ${id
          .toString()
          .toLowerCase()} - Order by ${customerName} Removed!`,
        classes: "rounded red lighten-1"
      });
      return this.dbRef.doc(id).delete();
    });
  }
}
