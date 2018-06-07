import { Component, OnInit } from "@angular/core";
import {
  FavouriteProduct,
  ProductService
} from "../../shared/services/product.service";

// import { AuthService } from "../../shared/services/auth.service";
import {UserService} from '../../shared/services/user.service';
import {Cart} from '../../shared/models/cart';

@Component({
  selector: "app-user-cart-items",
  templateUrl: "./user-cart-items.component.html",
  styleUrls: ["./user-cart-items.component.scss"]
})
export class UserCartItemsComponent implements OnInit {
  products: FavouriteProduct[] = [];
  page = 1;
  orderList:number[]=[];
  // Not Found Message
  messageTitle = "No Products Found in Cart";
  messageDescription = "Please, Add Products to your cart";

  cartList: Cart[]=[];
  constructor(
    private userService:UserService,
    private productService: ProductService
    // public authService: AuthService
  ) {

}

  ngOnInit() {
    this.getCartProducts();
  }

  getCartProducts() {
    // const x = this.productService.getUsersCartProducts();
    // x.snapshotChanges().subscribe(data => {
    //   this.products = [];
    //   data.forEach(product => {
    //     const y = product.payload.toJSON() as FavouriteProduct;
    //     y["$key"] = product.key;
    //     this.products.push(y);
    //   });
    // });
    const x = this.productService.getUsersCartProducts();
    x.subscribe((cartList:Cart[])=>{
      this.cartList=cartList;
    });
  }

  removeFromCart(cno: number):void {
    this.productService.removeFromCart(cno).subscribe(data=>{
      this.getCartProducts();
    });
  }

  addCno(){
    console.log(this.orderList.pop);

  }
}
