import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import {Cart} from '../../shared/models/cart';
import {User} from '../../shared/models/user';
import {Order} from '../../shared/models/order';
import {OrderDetail} from '../../shared/models/orderDetail';
import { UserService } from "../../shared/services/user.service";
import { AuthService } from "../../shared/services/auth.service";
import { TokenService } from "../../shared/services/token.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-user-order-write',
  templateUrl: './user-order-write.component.html',
  styleUrls: ['./user-order-write.component.css']
})
export class UserOrderWriteComponent implements OnInit {

  constructor(
    private productService:ProductService,
    private authService:AuthService,
    private tokenService:TokenService,
    private router:Router
  ) { }
  loggedUser:User;
  orderList:number[]=[];
  orderLists:Order[]=[];
  cartList:Cart[]=[];
  totalPrice:number=0;
  order:Order=new Order();
  orderDetails:OrderDetail[]=[];

  addrCheck1:number=0;
  addrCheck2:number=0;
  addrCheck3:number=0;
  addrCheck4:number=0;
  oneUseAddr:string;

  //daum 주소 api
  daumAddressOptions =  {
    class: ['btn', 'btn-primary']
  };

  setDaumAddressApi(data){
    this.oneUseAddr=data.zip+" "+data.addr;
  }

  ngOnInit() {
    this.loggedUser=this.authService.getLoggedInUser();

    // if(this.tokenService.isToken('orderWriteLists')){
    //   this.cartList=this.tokenService.getToken('orderWriteLists');
    // }else{
      if(this.tokenService.getToken('fromCart')==true){//장바구니에서 온 경우
        this.orderList=this.tokenService.getToken('cartToOrder');
        this.orderListToOrderWrite();
      }else if(this.tokenService.getToken('fromCart')==false){//즉시구매에서 온 경우
        this.cartList[0]=this.tokenService.getToken('OWcart');
        // this.tokenService.saveToken('orderWriteLists',this.cartList);
        this.getTotalPrice();
      }
    // }

  }

  orderListToOrderWrite(){
    // 장바구니에서 선택한 상품의 CNO로 ProductService를 통해 Spring에 요청함
    console.log(this.orderList);
    this.productService.orderListToOrderWrite(this.orderList)
    .subscribe((carts:Cart[])=>{
      this.cartList=carts;
      this.tokenService.saveToken('orderWriteLists',this.cartList);
      this.getTotalPrice();
    });
  }

//결재하기 자바스크립트 체크로직
  checkOut(){
    //주문 테이블(TM_ORDER)
    console.log('in the checkOut');

    //배송지 체크에 따라 적용 주소 변경
    if((this.addrCheck1+this.addrCheck2+this.addrCheck3+this.addrCheck4)>1){
      alert('배송지를 하나만 선택하세요');
      return;
    }
    else if(this.addrCheck1==1){
        this.order.oaddr=this.authService.getLoggedInUser().uaddr1;
    }else if(this.addrCheck2==1){
        this.order.oaddr=this.authService.getLoggedInUser().uaddr2;
    }else if(this.addrCheck3==1){
        this.order.oaddr=this.authService.getLoggedInUser().uaddr3;
    }else if(this.addrCheck4==1){
        this.order.oaddr=this.oneUseAddr;
    }else{
      alert('배송지를 선택하세요');
      return;
    }
    console.log(this.order.oaddr);
    //주문테이블에 주문객체 삽입
    this.order.uid=this.authService.getLoggedInUser().uid;
    this.order.ototal=this.totalPrice;
    this.productService.checkOutOrder(this.order).subscribe(data=>{


    //주문상세 테이블(TM_ORDER_DETAIL)에 삽입할 주문상세 배열 생성
      for(let i=0;i<this.cartList.length;i++){
        this.orderDetails[i]=new OrderDetail();
        this.orderDetails[i].odimg=this.cartList[i].p_img;
        this.orderDetails[i].odpname=this.cartList[i].p_name;
        this.orderDetails[i].odpprice=this.cartList[i].p_sellprice;
        this.orderDetails[i].odpamount=this.cartList[i].camount;
      }
      console.log('after For');
      //주문상세 테이블에 주문상세 배열 삽입
      this.productService.checkOutOrderDetail(this.orderDetails).subscribe(data=>{
        //구매완료 후 장바구니에서 삭제
        for(let i=0;i<this.cartList.length;i++){
          this.productService.removeFromCart(this.cartList[i].cno).subscribe(data=>
          {
          });
        }
      alert("구매가 완료 되었습니다.");
      this.router.navigate(["/users",{outlets:{profileOutlet:['order-list']}}])

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

  //주소 체크박스 선택/해제 시 Check값 Toggle
  addrCheckF1(){
    if(this.addrCheck1==0){
      this.addrCheck1=1;
    }
    else{
      this.addrCheck1=0;
    }

      console.log(this.addrCheck1);
  }
  addrCheckF2(){
    if(this.addrCheck2==0){
      this.addrCheck2=1;
    }
    else{
      this.addrCheck2=0;
    }
      console.log(this.addrCheck2);
  }
  addrCheckF3(){
    if(this.addrCheck3==0){
      this.addrCheck3=1;
    }
    else{
      this.addrCheck3=0;
    }
      console.log(this.addrCheck3);
  }
  addrCheckF4(){
    if(this.addrCheck4==0){
      this.addrCheck4=1;
    }

    else{
      this.addrCheck4=0;
    }
      console.log(this.addrCheck4);
  }
}
