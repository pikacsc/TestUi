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
import { TokenService } from "../../shared/services/token.service";
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
  change:boolean=false;
  constructor(
    private authService:AuthService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService:TokenService
  ) {

}
  ngOnInit() {
    this.loggedUser = this.authService.getLoggedInUser();
    if(this.tokenService.isToken('cartLists')){
      this.cartList=this.tokenService.getToken('cartLists');
    }else{
      this.getCartProducts();
    }
  }

  getCartProducts() {
    this.productService.getUsersCartProducts().subscribe((cartList:Cart[])=>{
      this.cartList=cartList;
      this.tokenService.saveToken('cartLists',this.cartList);
    });
  }

  removeFromCart(cno: number) {
    this.productService.removeFromCart(cno).subscribe(data=>{
      this.tokenService.removeToken('cartLists');
      alert("삭제 되었습니다.");
    });
  }

    updateCart(cart:Cart){
      this.productService.updateCart(cart).subscribe((cart:Cart)=>{
        this.tokenService.removeToken('cartLists');
        alert("수정 되었습니다.");
      });
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
  gotoOrderWirte(){
    this.productService.cartToOrder=this.orderList;
    // this.productService.fromCart=true;

    if(this.tokenService.isToken('fromCart')){
      this.tokenService.updateToken('fromCart',true);
    }else{
      this.tokenService.saveToken('fromCart',true);
    }

    if(this.tokenService.isToken('cartToOrder')){
      this.tokenService.updateToken('cartToOrder',this.orderList);
    }else{
      this.tokenService.saveToken('cartToOrder',this.orderList);
    }
    this.router.navigate(["/users",{outlets:{profileOutlet:['order-write']}}]);

  }



}
