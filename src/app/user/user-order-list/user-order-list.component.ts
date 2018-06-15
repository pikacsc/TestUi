import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {Order} from '../../shared/models/order';
import {OrderDetail} from '../../shared/models/orderDetail';
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
import { TokenService } from "../../shared/services/token.service";
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
  orderNum:number=0; //총 주문량이 될 수 있음 = oViewNum
  OrderCancle=0; // 주문취소건수
  OrderWait=0; // 주문대기건수 (평소)
  OrderCommit=0; // 주문완료건수
  oAddress:string;
  constructor(
    private productService:ProductService,
    private authService:AuthService,
    private tokenService:TokenService
  ) { }

  ngOnInit() {
    this.uid=this.authService.getLoggedInUser().uid;
    if(this.tokenService.isToken('orderLists')){
      this.orderLists=this.tokenService.getToken('orderLists');
      this.OrderCancle=this.tokenService.getToken('OrderCancle');
      this.OrderWait = this.tokenService.getToken('OrderWait');
      this.OrderCommit=this.tokenService.getToken('OrderCommit');
      this.orderNum=this.tokenService.getToken('orderNum');
    }else{
      this.getOrderList(this.uid);
    }


  }
  //select
  getOrderList(uid:string){
    if(this.tokenService.isToken('orderLists')==false){
      this.productService.getOrderList(uid).subscribe((lists:Order[])=>{
        this.orderLists=lists;
        for(let i=0;i<this.orderLists.length;i++){
          this.orderLists[i].oViewNum=++this.orderNum;
          if(this.orderLists[i].ostatus=='C'){
            this.OrderCancle++;
          }else if(this.orderLists[i].ostatus=='N'){
            this.OrderWait++;
          }else if(this.orderLists[i].ostatus=='Y'){
            this.OrderCommit++;
          }
        }
        this.tokenService.saveToken('orderLists',this.orderLists);
        this.tokenService.saveToken('OrderCancle',this.OrderCancle);
        this.tokenService.saveToken('OrderWait',this.OrderWait);
        this.tokenService.saveToken('OrderCommit',this.OrderCommit);
        this.tokenService.saveToken('orderNum',this.orderNum);
      });
    }
  }
  getDetailList(ono:number,oaddr:string){
    this.oAddress=oaddr;
      this.productService.getDetailList(ono).subscribe((details:OrderDetail[])=>{
        this.detailLists=details;
        console.log(this.detailLists);
      });
  }

}
