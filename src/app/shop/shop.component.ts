import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from "@angular/forms";

import { Order, Item } from "../interfaces/Shop";
import {
  cpuList,
  motherBoardList,
  videoCardList,
  memoryList
} from "./categories";
import { orders } from "../mock-data/hardware";

declare var M: any;

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"]
})
export class ShopComponent implements OnInit {
  categories: String[] = ["CPU", "Motherboard", "Video Card", "Memory"];
  orders: Order[];
  setName = [];
  setPrice = [];
  itemsForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initModal();
    this.initForm();
    this.orders = orders;
  }

  initForm() {
    this.itemsForm = this.fb.group({
      customerName: ["", Validators.required],
      email: ["", Validators.required],
      items: this.fb.array([
        this.fb.group({
          category: ["", Validators.required],
          name: ["", Validators.required],
          price: [0, Validators.required]
        })
      ])
    });
  }

  initModal() {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems);
  }

  get categoriesControl() {
    return this.itemsForm.get("items") as FormArray;
  }

  addField() {
    const newCategories = this.fb.group({
      category: ["", Validators.required],
      name: ["", Validators.required],
      price: [0, Validators.required]
    });
    this.categoriesControl.push(newCategories);
  }

  deleteField(i: number) {
    this.categoriesControl.removeAt(i);
  }

  onSubmit() {
    let total = 0;
    const totalPrice = this.itemsForm.value.items.reduce(
      (acc: object, val: Item) => {
        acc["totalPrice"] = total += val.price;
        return acc;
      },
      {}
    );
    const doc = { ...this.itemsForm.value, ...totalPrice };
    return this.orders.unshift(doc);
  }

  cancel() {
    return this.initForm();
  }

  getName(index: number) {
    const fcCategory = this.getCategory("category", index);
    fcCategory.toLowerCase() == "cpu"
      ? (this.setName[index] = cpuList)
      : fcCategory.toLowerCase() == "motherboard"
      ? (this.setName[index] = motherBoardList)
      : fcCategory.toLowerCase() == "video card"
      ? (this.setName[index] = videoCardList)
      : (this.setName[index] = memoryList);
  }

  getPrice(index: number) {
    const fcName = this.getCategory("name", index);
    const val = this.setName[index].find((v: Item) => v.name === fcName);
    const path = this.categoriesControl.at(index).get("price");
    return path.setValue(val.price);
  }

  getCategory(params: string, index: number) {
    return this.categoriesControl.at(index).get(params).value;
  }

  getPriceVal(index: number) {
    return this.categoriesControl.at(index).get("price").value;
  }
}
