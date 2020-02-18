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
      M.toast({
        html: ` <i class="material-icons left">done</i>Order ${obs.id
          .toString()
          .toUpperCase()} Success Added!`,
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
      classes: "rounded green lighten-1"
    });
    return subscriptions;
  }

  deleteOrder(args: Order) {
    this.dbRef
      .valueChanges({ idField: "id" })
      .pipe(take(1))
      .subscribe(async (vals: Order[]) => {
        const { id } = vals.find(v => v.id === args.id);
        return this.dbRef
          .doc(id)
          .delete()
          .then(() => {
            M.toast({
              html: ` <i class="material-icons left">block</i>Order - ${id
                .toString()
                .toUpperCase()} Removed!`,
              classes: "rounded blue-grey darken-4"
            });
          });
      });
  }
}
