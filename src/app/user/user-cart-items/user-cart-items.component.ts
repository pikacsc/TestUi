import { Component, OnInit } from "@angular/core";
import {
  FavouriteProduct,
  ProductService
} from "../../shared/services/product.service";

// import { AuthService } from "../../shared/services/auth.service";
import {UserService} from '../../shared/services/user.service';
import {Cart} from '../../shared/models/cart';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { User } from "../../shared/models/user";
@Component({
  selector: "app-user-cart-items",
  templateUrl: "./user-cart-items.component.html",
  styleUrls: ["./user-cart-items.component.scss"]
})
export class UserCartItemsComponent implements OnInit {

  page = 1;
  orderList:number[]=[];

  loggedUser:User;
  cartList: Cart[]=[];
  constructor(
    private authService:AuthService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {

}
  ngOnInit() {
    this.loggedUser = this.authService.getLoggedInUser();
    this.getCartProducts();
  }

  getCartProducts() {
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

  updateCart(cno:number, camount:number):void{
    this.productService.updateCart(cno,camount).subscribe(data=>{
      this.getCartProducts();
    })
  }

//장바구니 체크 / 체크해제 시 array에 C_NO를 추가/삭제한다.
  pushCno(e, cno:number){
    if(e.target.checked){
      this.orderList.push(cno);
      console.log(this.orderList);
    }else{
      const index:number = this.orderList.indexOf(cno);
      this.orderList.splice(index,1);
      console.log(this.orderList);
    }
  }

//주문진행 페이지로 가기 전 저장된 배열을 service에 저장한다.
  gotoOrderWirte():boolean{
    this.productService.cartToOrder=this.orderList;

    return true;
  }



}
