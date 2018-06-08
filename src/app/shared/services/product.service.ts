import { Injectable, EventEmitter, Output } from "@angular/core";
// import {
//   AngularFireDatabase,
//   AngularFireList,
//   AngularFireObject
// } from "angularfire2/database";
import { ToastOptions, ToastyService, ToastyConfig } from "ng2-toasty";
import { Observable } from "rxjs";
import { Product } from "../models/product";
// import { AuthService } from "./auth.service";
//*****동현임포트수정
import { UserService } from "./user.service";
import { HttpClientModule,HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { CommonModule } from "@angular/common";
import { User } from "../models/user";
import { AuthService } from "./auth.service";
// import {Cart} from '../models/cart';
//*****동현임포트수정끝
import { CachcingServiceBase } from "./cachcing.service";

let count = 0;


@Injectable()
export class ProductService extends CachcingServiceBase{


  productlistUrl = 'http://localhost:8080/toma/';
  private products: Observable<Product[]>;

  // products: AngularFireList<Product>;
  // product: AngularFireObject<Product>;

  // favouriteProducts
  // favouriteProducts: AngularFireList<FavouriteProduct>;
  // cartProducts: AngularFireList<FavouriteProduct>;

  // NavbarCounts
  navbarCartCount = 0;
  navbarFavProdCount = 0;

  // constructor()(
  //   // private db: AngularFireDatabase,
  //   // private authService: AuthService,
  //   // 동현생성자수정
  //   private userService: UserService,
  //   private http:HttpClient,
  //   // 동현생성자수정끝
  //   private toastyService: ToastyService,
  //   private toastyConfig: ToastyConfig
  // ) {
  //   // Toaster Config
  //   this.toastyConfig.position = "top-right";
  //   this.toastyConfig.theme = "material";
  //
  //   // if (this.authService.isLoggedIn()) {
  //   //   this.calculateFavProductCounts();
  //   //   this.calculateCartProductCounts();
  //   // } else {
  //   //   this.calculateLocalFavProdCounts();
  //   //   this.calculateLocalCartProdCounts();
  //   // }
  // }

  cartToOrder:number[]=[];
  public constructor(
    // 동현생성자수정
    private userService: UserService,
    private authService: AuthService,
    private http:HttpClient,
    // 동현생성자수정끝
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig){

      super();


      //동현 카트에서가져온리스트를 담을 nuber[]
      this.toastyConfig.position = "top-right";
      this.toastyConfig.theme = "material";



  }




  public getProducts(){
    // this.products = this.db.list("products");
    // return this.products;

    // return this.cache<Product[]>(() => this.products,
    //                            (val: Observable<Product[]>) => this.products = val,
    //                            () => this.http
    //                                      .get("http://localhost:8080/toma")
    //                                      .map((response) => response.json()
    //                                                                 .map((item) => {
    //                                                                   let model = new Product();
    //                                                                   model.updateFrom(item);
    //                                                                   return model;
    //                                                                 })));

    return this.http.get(this.productlistUrl);

  }

  createProduct(data: Product) {
    // this.products.push(data);
  }

  getProductById(key: string) {
    // this.product = this.db.object("products/" + key);
    // return this.product;
  }

  updateProduct(data: Product) {
    // this.products.update(data.$key, data);
  }

  deleteProduct(key: string) {
    // this.products.remove(key);
  }

  /*
   ----------  Favourite Product Function  ----------
  */

  // Get Favourite Product based on userId
  getUsersFavouriteProduct() {
    // const user = this.authService.getLoggedInUser();
    // this.favouriteProducts = this.db.list("favouriteProducts", ref =>
    //   ref.orderByChild("userId").equalTo(user.$key)
    // );
    // return this.favouriteProducts;
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

    // if (this.authService.isLoggedIn() === false) {
    //   let a: Product[];
    //   a = JSON.parse(localStorage.getItem("avf_item")) || [];
    //   a.push(data);
    //   this.toastyService.wait(toastAdd);
    //   setTimeout(() => {
    //     localStorage.setItem("avf_item", JSON.stringify(a));
    //     this.calculateLocalFavProdCounts();
    //   }, 1500);
    // }
    // if (this.authService.isLoggedIn() === true) {
    //   const user = this.authService.getLoggedInUser();
    //
    //   const productKey = data.$key;
    //
    //   delete data.$key;

      // this.toastyService.wait(toastAdd);
      // setTimeout(() => {
      //   this.favouriteProducts.push({
      //     product: data,
          // productId: productKey,
      //     userId: user.$key
      //   });
      //
      //   this.calculateFavProductCounts();
      // }, 1500);
    }
  // }

  // Fetching unsigned users favourite proucts
  // getLocalFavouriteProducts(): Product[] {
  //   const products: Product[] =
  //     JSON.parse(localStorage.getItem("avf_item")) || [];
  //
  //   return products;
  // }

  // Removing Favourite Product from Database
  // removeFavourite(key: string) {
  //   this.favouriteProducts.remove(key);
  // }

  // Removing Favourite Product from localStorage
  // removeLocalFavourite(product: Product) {
  //
  //   const products: Product[] = JSON.parse(localStorage.getItem("avf_item"));
  //
  //   for (let i = 0; i < products.length; i++) {
  //     if (products[i].productId === product.productId) {
  //       products.splice(i, 1);
  //       break;
  //     }
  //   }
  //   // ReAdding the products after remove
  //   localStorage.setItem("avf_item", JSON.stringify(products));
  //
  //   this.calculateLocalFavProdCounts();
  // }

  // Returning Local Products Count
  // calculateLocalFavProdCounts() {
  //   this.navbarFavProdCount = this.getLocalFavouriteProducts().length;
  // }

  // Calculating FavProductsCount and storing it in variable
  // calculateFavProductCounts() {
    // const x = this.getUsersFavouriteProduct()
    //   .snapshotChanges()
    //   .subscribe(data => {
    //     this.navbarFavProdCount = data.length;
    //   });
  // }

  /*
   ----------  Cart Product Function  ----------
  */

  // Fetching Cart Products based on userId
  // **********동현카트구현중*************
  cartUrl='http://localhost:8080/toma/cart/';
  getUsersCartProducts() {
  return this.http.get(this.cartUrl+this.authService.getLoggedInUser().uid);
  //   const user = this.authService.getLoggedInUser();
    // this.cartProducts = this.db.list("cartProducts", ref =>
    //   ref.orderByChild("userId").equalTo(user.$key)
    // );
    // return this.cartProducts;
  }
  removeFromCart(cno:number){
    console.log('serviceremove'+cno);
    return this.http.delete(this.cartUrl+cno);
  }
  //************동현카트끝***********************
  //*************동현orderWrite*****************

  orderListToOrderWrite(cartToOrder:number[]) {
    return this.http.put(this.cartUrl+'goOrderWrite',cartToOrder);
  }





  //*************동현orderwrite끝*****************
  // Adding new Product to cart db if logged in else localStorage
  // addToCart(data: Product): void {
  //   if (this.authService.isLoggedIn() === false) {
  //     let a: Product[];
  //
  //     a = JSON.parse(localStorage.getItem("avct_item")) || [];
  //
  //     a.push(data);
  //
  //     const toastOption: ToastOptions = {
  //       title: "Adding Product to Local Cart",
  //       msg: "Please add product to cart after signing in to update to server",
  //       showClose: true,
  //       timeout: 5000,
  //       theme: "material"
  //     };
  //     this.toastyService.wait(toastOption);
  //     setTimeout(() => {
  //       localStorage.setItem("avct_item", JSON.stringify(a));
  //       this.calculateLocalCartProdCounts();
  //     }, 1500);
  //   }
  //   if (this.authService.isLoggedIn() === true) {
  //     const user = this.authService.getLoggedInUser();
  //
  //     const productKey = data.$key;
  //
  //     delete data.$key;
  //
  //     const toastOption: ToastOptions = {
  //       title: "Added  to Cart",
  //       msg: "Adding Product to Cart",
  //       showClose: true,
  //       timeout: 5000,
  //       theme: "material"
  //     };
  //     this.toastyService.wait(toastOption);
      // setTimeout(() => {
      //   this.cartProducts.push({
      //     product: data,
      //     productId: productKey,
      //     userId: user.$key
      //   });
      //
      //   this.calculateCartProductCounts();
      // }, 1500);
  //   }
  // }

  // Removing Cart product from db
  // removeCart(key: string) {
    // this.cartProducts.remove(key);
  // }

  // Removing cart from local
  // removeLocalCartProduct(product: Product) {
  //
  //   const products: Product[] = JSON.parse(localStorage.getItem("avct_item"));
  //
  //   for (let i = 0; i < products.length; i++) {
  //     if (products[i].productId === product.productId) {
  //       products.splice(i, 1);
  //       break;
  //     }
  //   }
  //   // ReAdding the products after remove
  //   localStorage.setItem("avct_item", JSON.stringify(products));
  //
  //   this.calculateLocalCartProdCounts();
  // }

  // Fetching Locat CartsProducts
  // getLocalCartProducts(): Product[] {
  //   const products: Product[] =
  //     JSON.parse(localStorage.getItem("avct_item")) || [];
  //
  //   return products;
  // }

  // returning LocalCarts Product Count
  // calculateLocalCartProdCounts() {
  //   this.navbarCartCount = this.getLocalCartProducts().length;
  // }

  // Calculating Cart products count and assigning to variable
  // calculateCartProductCounts() {
    // const x = this.getUsersCartProducts()
    //   .snapshotChanges()
    //   .subscribe(data => {
    //     this.navbarCartCount = data.length;
    //   });
//   }
}


export class FavouriteProduct {
  product: Product;
  p_code: string;
  u_id: string;
}
