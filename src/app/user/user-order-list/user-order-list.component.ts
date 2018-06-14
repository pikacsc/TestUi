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
  orderNum:number=0;
  oAddress:string;
  constructor(
    private productService:ProductService,
    private authService:AuthService,
    private tokenService:TokenService
  ) { }

  ngOnInit() {
    this.uid=this.authService.getLoggedInUser().uid;
    if(this.tokenService.isToken('orderLists')){
      alert("토큰가져옴");
      this.orderLists=this.tokenService.getToken('orderLists');
    }else{
      alert("토큰없음");
      this.getOrderList(this.uid);
    }


  }
  getOrderList(uid:string){
    if(this.tokenService.isToken('orderLists')==false){
      this.productService.getOrderList(uid).subscribe((lists:Order[])=>{
        this.orderLists=lists;
        for(let i=0;i<this.orderLists.length;i++){
          this.orderLists[i].oViewNum=++this.orderNum;
        }
        this.tokenService.saveToken('orderLists',this.orderLists);
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
