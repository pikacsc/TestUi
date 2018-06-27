import { Injectable, EventEmitter, Output } from "@angular/core";
import { ToastOptions, ToastyService, ToastyConfig } from "ng2-toasty";
import { Observable } from "rxjs";
import { Product } from "../models/product";
//*****동현임포트수정
import { UserService } from "./user.service";
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { CommonModule } from "@angular/common";
import { User } from "../models/user";
import { AuthService } from "./auth.service";
import { Cart } from '../models/cart';
import { Order } from '../../shared/models/order';
import { OrderDetail } from '../../shared/models/orderDetail';
//*****  동현임포트수정끝
import { CachcingServiceBase } from "./cachcing.service";
import { TokenService } from "./token.service";

let count = 0;

@Injectable()
export class ProductService extends CachcingServiceBase {
  private productListUrl = 'http://localhost:8080/toma/';
  private productReviewUrl = 'http://localhost:8080/toma/review/';
  private productQnaUrl = 'http://localhost:8080/toma/productqna/';

  private products: Observable<Product[]>;
  p_code: string;

  navbarCartCount = 0;
  navbarFavProdCount = 0;

  cartToOrder: number[] = [];
  cart: Cart;
  fromCart: boolean = false;

  //동현변수끝
  public constructor(
    // 동현생성자수정
    private userService: UserService,
    private authService: AuthService,
    private http: HttpClient,
    // 동현생성자수정끝
    private toastyService: ToastyService,
    private tokenService: TokenService,
    private toastyConfig: ToastyConfig) {

    super();
    this.toastyConfig.position = "top-right";
    this.toastyConfig.theme = "material";
  }

  getProductQna() {
    return this.http.get(this.productQnaUrl + this.p_code);
  }

  setProductCode(p_code: string) {
    this.p_code = p_code;
  }

  getProductCode() {
    return this.p_code;
  }

  getReview() {
    return this.http.get(this.productReviewUrl + this.p_code);
  }

  public getProducts() {
    return this.http.get(this.productListUrl);
  }

  getProductByKind(p_kind: string) {
    return this.http.get(this.productListUrl + 'product/' + p_kind);
  }

  getProductById(p_code: string) {
    return this.http.get(this.productListUrl + 'detail/product/' + p_code);
  }

  deleteProduct(key: string) {

  }

  // Adding New product to favourite if logged else to localStorage
  addFavouriteProduct(data: Product): void {
    // Toast Product Already exists
    const toastAlreadyExists: ToastOptions = {
      title: "Product Already Added",
      msg: "You have already added this product to favourite list",
      showClose: true,
      timeout: 5000,
      theme: "material"
    };

    // Toaster Adding
    const toastAdd: ToastOptions = {
      title: "Adding Product to Local",
      msg: "Adding Product as Favourite",
      showClose: true,
      timeout: 5000,
      theme: "material"
    };
  }

  /*
   ----------  Cart Product Function  ----------
  */

  // Fetching Cart Products based on userId
  // **********동현카트구현중*************
  cartUrl = 'http://localhost:8080/toma/cart/';
  getUsersCartProducts() {
    return this.http.get(this.cartUrl + this.authService.getLoggedInUser().uid);
  }
  removeFromCart(cno: number) {
    console.log('serviceremove' + cno);
    return this.http.delete(this.cartUrl + cno);
  }

  addToCart(cart: Cart) {
    return this.http.post(this.cartUrl, cart);
  }

  updateCart(cart: Cart) {
    return this.http.put(this.cartUrl, cart);
  }
  //************동현카트끝***********************
  //*************동현orderWrite*****************

  orderUrl = 'http://localhost:8080/toma/order/';
  orderListToOrderWrite(cartToOrder: number[]) {
    return this.http.put(this.cartUrl + 'goOrderWrite', cartToOrder);
  }
  checkOutOrder(order: Order) {
    return this.http.post(this.orderUrl + 'insert/order', order);
  }

  checkOutOrderDetail(orderDetails: OrderDetail[]) {
    return this.http.post(this.orderUrl + 'insert/detail', orderDetails);
  }
  //*************동현orderwrite끝*****************
  //*************동현 orderList*******************
  getOrderList(uid: string) {
    return this.http.get(this.orderUrl + uid);
  }
  getDetailList(ono: number) {
    return this.http.get(this.orderUrl + 'orderdetail/' + ono);
  }
  cancleOrder(ono: number) {
    return this.http.put(this.orderUrl + 'cancle', ono);
  }
}

export class FavouriteProduct {
  product: Product;
  p_code: string;
  u_id: string;
}
