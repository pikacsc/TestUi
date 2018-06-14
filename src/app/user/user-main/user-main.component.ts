import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {Order} from '../../shared/models/order';
import {OrderDetail} from '../../shared/models/orderDetail';
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  orderLists : Order[]=[];
  loggedInUser:User;

  OrderCancle=0; // 주문취소건수
  OrderCommit=0; // 주문완료건수
  AllOrders=0; // 모든주문건수
  constructor(
    private productService:ProductService,
    private authService:AuthService
    // private loggedInUser:User
  ) {   }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.OnlyGetOrderList(this.loggedInUser.uid);
  }

  OnlyGetOrderList(uid:string){
    //getOrderList함수 = uid를 받아서 tm_orderlist (arraylist객체로)반환
    this.productService.getOrderList(this.loggedInUser.uid).subscribe((data:Order[])=>{
      this.orderLists = data;
      for(let i=0;i<this.orderLists.length;i++){
        this.AllOrders++;
        if(this.orderLists[i].ostatus=='N'){
          this.OrderCancle++;
        }if(this.orderLists[i].ostatus=='Y'){
          this.OrderCommit++;
        }
      }
  });
  }
}
