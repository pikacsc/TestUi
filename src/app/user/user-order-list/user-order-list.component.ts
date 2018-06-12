import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {Order} from '../../shared/models/order';
import {OrderDetail} from '../../shared/models/orderDetail';
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.css']
})
export class UserOrderListComponent implements OnInit {

  // checkNum:number=0;
  uid:string;
  orderLists:Order[]=[];
  detailLists:OrderDetail[]=[];
  orderNum:number=0;
  constructor(
    private productService:ProductService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.uid=this.authService.getLoggedInUser().uid;
    this.getOrderList(this.uid);

  }
  getOrderList(uid:string){
    this.productService.getOrderList(uid).subscribe((lists:Order[])=>{
      this.orderLists=lists;
      for(let i=0;i<this.orderLists.length;i++){
        this.orderLists[i].oViewNum=++this.orderNum;
      }
    });
  }
  getDetailList(ono:number){
      this.productService.getDetailList(ono).subscribe((details:OrderDetail[])=>{
        this.detailLists=details;
        console.log(this.detailLists);
      });
  }
}
