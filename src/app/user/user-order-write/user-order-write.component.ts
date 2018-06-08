import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import {Cart} from '../../shared/models/cart';
import { UserService } from "../../shared/services/user.service";
@Component({
  selector: 'app-user-order-write',
  templateUrl: './user-order-write.component.html',
  styleUrls: ['./user-order-write.component.css']
})
export class UserOrderWriteComponent implements OnInit {

  constructor(private productService:ProductService) { }

  orderList:number[]=[];
  cartList:Cart[]=[];
  totalPrice:number=0;
  ngOnInit() {
    this.orderListToOrderWrite();
  }

  orderListToOrderWrite(){
    // 장바구니에서 선택한 상품의 CNO로 ProductService를 통해 Spring에 요청함
    this.orderList=this.productService.cartToOrder;
    console.log(this.orderList);
    this.productService.orderListToOrderWrite(this.orderList)
    .subscribe((carts:Cart[])=>{
      this.cartList=carts;
      this.getTotalPrice();
    });
  }

  getTotalPrice(){
    var i=0;
    while(i<this.cartList.length){
      this.totalPrice+=this.cartList[i].p_sellprice*this.cartList[i].camount;

      i++;
      console.log(this.totalPrice);
    }
  }
}
