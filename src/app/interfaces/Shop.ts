export interface Order {
  totalPrice: number;
  customerName: string;
  email: string;
  items: Item[];
}

export interface Item {
  category: string;
  name: string;
  price: number;
}
