import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Order } from "../interfaces/Shop";
import { Observable } from "rxjs";
import { reducing } from "../helpers/reduce";

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

  submitOrder(formVal) {
    const totalPrice = reducing(formVal.items, "shop");
    const doc = { ...formVal, ...totalPrice };
    this.dbRef.add(doc);
  }

  editOrder(formVal: any, each: Order) {
    const totalPrice = reducing(formVal.items, "shop");
    const doc = { ...formVal, ...totalPrice };
    this.dbRef.valueChanges({ idField: "id" }).subscribe(vals => {
      const { id } = vals.find(({ id }) => id === each.id);
      return this.dbRef.doc(id).update(doc);
    });
  }

  deleteOrder({ id }) {
    this.dbRef.doc(id).delete();
  }
}
