import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";
import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";
import { TokenService } from "../../shared/services/token.service";

import { Cart } from "../../shared/models/cart";
import { AuthService} from "../../shared/services/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  private sub: any;
  product: Product;

  cart:Cart;
  carts:Cart[]=[];
  pQuantity:number=1;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinnerService: LoaderSpinnerService,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.product = new Product();


  }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   const id = params["id"]; // (+) converts string 'id' to a number
    //   this.getProductDetail(id);
    // });

    if(this.tokenService.isToken("productDetailToken")){
      this.product = this.tokenService.getToken("productDetailToken");
    }else{

      this.productService.getProductById()
      .subscribe((product : Product) =>
       {this.product = product;
        this.tokenService.saveToken("productDetailToken", product);
         console.log(this.product.p_price);
         console.log(this.product.p_sellPrice);
         console.log(this.product.p_name);
         console.log(this.product.p_profit);
       });

    }


  }

  setProductCode(p_code: string) {
    this.productService.setProductCode(p_code);
  }


  getProductDetail(p_code: string) {
    // this.spinnerService.show();
    // const x = this.productService.getProductById(p_code);
    // x.snapshotChanges().subscribe(product => {
    //   this.spinnerService.hide();
    //   const y = product.payload.toJSON() as Product;
    //
    //   y["$key"] = id;
    //   this.product = y;
    // });
  }

  addToCart(){
    this.cart=new Cart();
   this.cart.uid=this.authService.getLoggedInUser().uid;
   this.cart.pcode=this.product.p_code;
   this.cart.camount=this.pQuantity;
   this.productService.addToCart(this.cart).subscribe((cart:Cart)=>{
   this.cart=cart;
   this.tokenService.removeToken('cartLists');
   alert('장바구니에 담았습니다.');
   });
  }

  gotoOrderWirte(){
    this.cart=new Cart();
    this.cart.uid=this.authService.getLoggedInUser().uid;
    this.cart.pcode=this.product.p_code;
    this.cart.camount=this.pQuantity;
    this.cart.p_img=this.product.p_img;
    this.cart.p_sellprice=this.product.p_sellPrice;
    this.cart.p_name=this.product.p_name;
    this.cart.p_kind=this.product.p_kind;
    this.cart.p_content=this.product.p_content;

    this.productService.cart=this.cart;
    this.productService.fromCart=false;
    console.log(this.cart);
    this.router.navigate(["/users",{outlets:{profileOutlet:['order-write']}}]);
  }

  pQuantityUp(){
    ++this.pQuantity;
  }

  pQuantityDown(){
    if(this.pQuantity>1)
      --this.pQuantity;
    else
      alert('더 이상 줄일 수 없습니다.');
  }
}
