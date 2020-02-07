import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Order, Item } from "../interfaces/Shop";
import { Observable } from "rxjs";
import { reducing } from "../helpers/reduce";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private db: AngularFirestore) {}
  dbRef = this.db.collection<Order>("orders");

  getOrders(): Observable<Order[]> {
    return this.dbRef.valueChanges();
  }

  submitOrder(formVal) {
    const totalPrice = reducing(formVal.items, "shop");
    const id = this.db.createId();
    const doc = { ...formVal, ...totalPrice, id };
    return this.dbRef.doc(id).set(doc);
  }

  editOrder(formVal: any, each: Order) {
    const totalPrice = reducing(formVal.items, "shop");
    const doc = { ...formVal, ...totalPrice };
    return this.dbRef.snapshotChanges().subscribe(vals => {
      const { id } = vals.find(
        val => val.payload.doc.id === each.id
      ).payload.doc;
      this.dbRef.doc(id).update(doc);
    });
  }

  async deleteOrder(order) {
    this.dbRef.snapshotChanges().subscribe(async vals => {
      const { id } = vals.find(v => v.payload.doc.id == order.id).payload.doc;
      const deleting = await this.dbRef.doc(id).delete();
      return deleting;
    });
  }
}
