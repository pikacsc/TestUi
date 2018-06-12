import { Component, OnInit } from "@angular/core";
import { ToastyConfig, ToastOptions, ToastyService } from "ng2-toasty";
import { Product } from "../../shared/models/product";
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";

//**동현
import {Cart} from "../../shared/models/cart";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  productList: Product[];



  kinds = ["All", "Bakery", "Sauce", "Drink", "Instant","Snack"];
  selectedKind : "All";



  page = 1;

  //** 동현 변수
  cart:Cart=new Cart();
  // 동현 변수끝
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private spinnerService: LoaderSpinnerService,
    private toastyConfig: ToastyConfig,
    private toastyService: ToastyService
  ) {}

  ngOnInit() {
    this.productService.getProducts()
    .subscribe((productList : Product[]) => {
      this.productList = productList;
    })

  }


  p_code : string;

  setProductCode(p_code: string) {
     this.productService.setProductCode(p_code);
  }

  // getAllProducts() {
  //   // this.spinnerService.show();
  //   // const x = this.productService.getProducts();
  //   // x.snapshotChanges().subscribe(product => {
  //   //   this.spinnerService.hide();
  //   //   this.productList = [];
  //   //   product.forEach(element => {
  //   //     const y = element.payload.toJSON();
  //   //     y["$key"] = element.key;
  //   //     this.productList.push(y as Product);
  //   //   });
  //   // });
  //
  //
  //
  // }

  getProductByKind(p_kind: string) {
    // this.product = this.db.object("products/" + key);
    // return this.product;

     this.productService.getProductByKind(this.selectedKind)
     .subscribe((productList : Product[]) => {
       this.productList = productList;
     })

  }




  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  //동현 장바구니에 물품추가기능
  addToCart(product: Product) {
    this.cart.uid=this.authService.getLoggedInUser().uid;
    this.cart.pcode=product.p_code;
    this.cart.camount=1;
    this.cart.p_img=product.p_img;
    this.cart.p_sellprice=product.p_sellprice;
    this.cart.p_name=product.p_name;
    this.cart.p_kind=product.p_kind;
    this.cart.p_content=product.p_content;
    this.productService.addToCart(this.cart).subscribe((cart: Cart)=>{
      alert('장바구니에 담았습니다.');
    });
  }
}
