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
  page = 1;
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

      this.getOrderList(this.uid);


  }
  //select
  getOrderList(uid:string){
    if(this.tokenService.isToken('orderLists')==false){
      this.productService.getOrderList(uid).subscribe((lists:Order[])=>{
        this.orderLists=lists;
        this.orderNum=0;
        this.OrderCancle=0;
        this.OrderWait=0;
        this.OrderCommit=0;
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

  cancleOrder(order:Order){
    var conf=confirm('주문 취소하시겠습니까?');
    if(conf){
      if(order.ostatus=='N'){
        this.productService.cancleOrder(order.ono).subscribe(data=>{
          alert('주문 취소가 완료 되었습니다.');
          this.getOrderList(this.uid);
      });
      this.tokenService.removeToken('OrderCancle');
      this.tokenService.removeToken('OrderWait');
      this.tokenService.removeToken('OrderCommit');
      this.tokenService.removeToken('orderLists');
      this.tokenService.removeToken('orderNum');

      this.getOrderList(this.authService.getLoggedInUser().uid);
      return;
      }else if(order.ostatus=='C'){
        alert('이미 취소된 상품입니다.');
        return;
      }else{
      alert('처리 완료된 상품은 취소가 불가능합니다.');
        return;
      }
    }
  }
}
