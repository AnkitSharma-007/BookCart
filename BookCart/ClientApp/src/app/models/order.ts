import { ShoppingCart } from "./shoppingcart";

export interface Order {
  orderDetails: ShoppingCart[];
  cartTotal?: number;
}
