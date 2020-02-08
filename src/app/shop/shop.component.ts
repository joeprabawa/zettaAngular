import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";

import { Order, Item } from "../interfaces/Shop";
import {
  cpuList,
  motherBoardList,
  videoCardList,
  memoryList
} from "./categories";

import { OrderService } from "../services/order.service";

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
  editing: boolean = false;
  params: Order;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private os: OrderService) {}

  ngOnInit() {
    this.initModal();
    this.initForm();
    this.initOrders();
  }

  initOrders() {
    this.loading = true;
    return this.os.getOrders().subscribe(val => {
      console.log(val);
      this.orders = val;
      this.loading = false;
    });
  }

  initForm(params?: Order) {
    this.itemsForm = this.fb.group({
      customerName: ["", Validators.required],
      email: ["", Validators.required],
      items: !params
        ? this.fb.array([this.initFormArr()])
        : this.fb.array(params.items.map(v => this.fb.group(v)))
    });
  }

  initModal() {
    const elems = document.querySelectorAll(".modal");
    M.Modal.init(elems);
  }

  initFormArr(): FormGroup {
    return this.fb.group({
      category: ["", Validators.required],
      name: ["", Validators.required],
      price: ["", Validators.required]
    });
  }

  get categoriesControl() {
    return this.itemsForm.get("items") as FormArray;
  }

  addField() {
    const newCategories = this.initFormArr();
    this.categoriesControl.push(newCategories);
  }

  deleteField(i: number) {
    this.categoriesControl.removeAt(i);
  }

  onSubmit() {
    this.os.submitOrder(this.itemsForm.value);
    this.initForm();
  }

  edit(item: Order) {
    this.editing = true;
    this.params = item;
    this.initForm(item);
    const { customerName, email, items } = item;
    this.itemsForm.patchValue({
      customerName,
      email,
      items
    });

    items.forEach((_, i) => {
      this.getName(i);
    });
  }

  onEdit() {
    this.os.editOrder(this.itemsForm.value, this.params);
    this.editing = false;
    this.initForm();
  }

  onDelete(order) {
    this.os.deleteOrder(order);
  }

  cancel() {
    return this.initForm();
  }

  getName(index: number) {
    const fcCategory = this.getPathOrFcValue("category", index, true);
    fcCategory.toLowerCase() == "cpu"
      ? (this.setName[index] = cpuList)
      : fcCategory.toLowerCase() == "motherboard"
      ? (this.setName[index] = motherBoardList)
      : fcCategory.toLowerCase() == "video card"
      ? (this.setName[index] = videoCardList)
      : (this.setName[index] = memoryList);
  }

  getPrice(index: number) {
    const fcName = this.getPathOrFcValue("name", index, true);
    const val = this.setName[index].find((v: Item) => v.name === fcName);
    const path = this.getPathOrFcValue("price", index);
    return path.setValue(val.price);
  }

  getPathOrFcValue(params: string, index: number, value?: boolean) {
    return value
      ? this.categoriesControl.at(index).get(params).value
      : this.categoriesControl.at(index).get(params);
  }
}
