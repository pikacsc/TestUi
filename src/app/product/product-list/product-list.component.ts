import { Component, OnInit } from "@angular/core";
import { ToastyConfig, ToastOptions, ToastyService } from "ng2-toasty";
import { Product } from "../../shared/models/product";
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";
import { TokenService } from "../../shared/services/token.service";

//**동현
import { Router } from '@angular/router';
import { Cart } from "../../shared/models/cart";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  currentDate = new Date();
  productList: Product[];

  kinds = ["All", "Bakery", "Sauce", "Drink", "Instant", "Snack"];
  selectedKind = "All";

  page = 1;

  //** 동현 변수
  cart: Cart = new Cart();
  // 동현 변수끝
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private spinnerService: LoaderSpinnerService,
    private toastyConfig: ToastyConfig,
    private toastyService: ToastyService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe((productList: Product[]) => {
        this.productList = productList;
      });
  }

  p_code: string;

  setProductCode(p_code: string) {
    this.productService.setProductCode(p_code);
    if (this.tokenService.isToken("p_code")) {
      this.tokenService.removeToken("p_code");
    }
    this.tokenService.saveToken("p_code", p_code);
    this.p_code = p_code;
  }

  getProductByKind(p_kind: string) {
    this.productService.getProductByKind(this.selectedKind)
      .subscribe((productList: Product[]) => {
        this.productList = productList;
      });
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  //동현 장바구니에 물품추가기능
  addToCart(product: Product) {
    if (this.authService.getLoggedInUser() == null) {
      alert('로그인 후 이용해주세요.');
      this.router.navigate(['/index/login']);
      return;
    }
    this.cart.uid = this.authService.getLoggedInUser().uid;
    this.cart.pcode = product.p_code;
    this.cart.camount = 1;
    this.cart.p_img = product.p_img;
    this.cart.p_sellprice = product.p_sellPrice;
    this.cart.p_name = product.p_name;
    this.cart.p_kind = product.p_kind;
    this.cart.p_content = product.p_content;
    this.productService.addToCart(this.cart).subscribe((cart: Cart) => {
      alert('장바구니에 담았습니다.');
      return;
    });

  }
}
