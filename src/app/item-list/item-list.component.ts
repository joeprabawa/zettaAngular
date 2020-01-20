import { Component, OnInit } from "@angular/core";
import { Items } from "../interface";
import { ItemsService } from "../items.service";

declare var M: any;

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.css"]
})
export class ItemListComponent implements OnInit {
  items: Items[];
  cart: Items[] = [];
  total: Number = 0;

  constructor(private service: ItemsService) {}

  // Get All Items
  getItems(): void {
    this.service.getAllItems().subscribe(allItems => (this.items = allItems));
  }

  addtoCart(cart: Items) {
    // Toggle AddedToCart Status
    cart.addedToCart = !cart.addedToCart;
    // Display Message Toggle Cart
    cart.addedToCart
      ? M.toast({
          html: `<i class="material-icons left">shopping_cart</i>  ${cart.name} Added`,
          classes: "rounded green lighten-1"
        })
      : M.toast({
          html: `<i class="material-icons left">remove_circle_outline</i> ${cart.name} Removed`,
          classes: "rounded red lighten-1"
        });
    // Add / Remove Item From Cart
    cart.addedToCart === true
      ? this.cart.push(cart)
      : this.cart.filter(v => v.addedToCart === cart.addedToCart);

    const inCart = this.cart.filter(v => v.addedToCart);
    this.cart = inCart;
  }

  // Calculate cart total
  calculate(): Number {
    return (this.total = this.cart.reduce((acc, val) => (acc += val.price), 0));
  }

  // Buy Events
  buy(): void {
    this.total > 1000
      ? M.toast({
          html: `<i class="material-icons left">block</i> You don't have enough gold`,
          classes: "rounded red lighten-1"
        })
      : this.total <= 1000 && this.cart.length
      ? M.toast({
          html: `<i class="material-icons left">done</i>Transaction Success!`,
          classes: "rounded green lighten-1"
        })
      : M.toast({
          html: `<i class="material-icons left">block</i>Please buy something`,
          classes: "rounded red lighten-1"
        });
  }

  ngOnInit() {
    this.getItems();
    M.toast({
      html: `<i class="material-icons left">info_outline</i>Scroll to bottom of the page, to view cart section`,
      classes: "rounded yellow lighten-1 grey-text text-darken-4",
      displayLength: 6000,
      inDuration: 500,
      outDuration: 750
    });
  }
}
