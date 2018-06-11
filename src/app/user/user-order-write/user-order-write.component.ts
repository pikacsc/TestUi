import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import {Cart} from '../../shared/models/cart';
import {User} from '../../shared/models/user';
import {Order} from '../../shared/models/order';
import {OrderDetail} from '../../shared/models/orderDetail';
import { UserService } from "../../shared/services/user.service";
import { AuthService } from "../../shared/services/auth.service";
@Component({
  selector: 'app-user-order-write',
  templateUrl: './user-order-write.component.html',
  styleUrls: ['./user-order-write.component.css']
})
export class UserOrderWriteComponent implements OnInit {

  constructor(
    private productService:ProductService,
    private authService:AuthService
  ) { }
  loggedUser:User;
  orderList:number[]=[];
  cartList:Cart[]=[];
  totalPrice:number=0;
  order:Order=new Order();
  orderDetails:OrderDetail[]=[];
  ngOnInit() {
    this.loggedUser=this.authService.getLoggedInUser();
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

//결재하기
  checkOut(){
    //주문 테이블(TM_ORDER)
    console.log('in the checkOut');
    this.order.uid=this.authService.getLoggedInUser().uid;
    this.order.ototal=this.totalPrice;
    this.order.oaddr=this.authService.getLoggedInUser().uaddr1;
    this.productService.checkOutOrder(this.order).subscribe(data=>{
    //주문상세 테이블(TM_ORDER_DETAIL)
      for(let i=0;i<this.cartList.length;i++){
        this.orderDetails[i]=new OrderDetail();
        this.orderDetails[i].odimg=this.cartList[i].p_img;
        this.orderDetails[i].odpname=this.cartList[i].p_name;
        this.orderDetails[i].odpprice=this.cartList[i].p_sellprice;
        this.orderDetails[i].odpamount=this.cartList[i].camount;
      }
      console.log('after For');
      this.productService.checkOutOrderDetail(this.orderDetails).subscribe(data=>{
        //구매완료 후 장바구니에서 삭제
        for(let i=0;i<this.cartList.length;i++){
          this.productService.removeFromCart(this.cartList[i].cno).subscribe(data=>
          {
          });
        }
      alert("구매가 완료 되었습니다.");
      });
    });
  }
//물품 + 배송비 => 총 가격
  getTotalPrice(){
    let i=0;
    while(i<this.cartList.length){
      this.totalPrice+=this.cartList[i].p_sellprice*this.cartList[i].camount;

      i++;
      console.log(this.totalPrice);
    }
  }
}
