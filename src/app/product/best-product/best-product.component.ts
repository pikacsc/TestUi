import { Component, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";
import { TokenService } from "../../shared/services/token.service";
declare var $: any;

@Component({
  selector: "app-best-product",
  templateUrl: "./best-product.component.html",
  styleUrls: ["./best-product.component.scss"]
})
export class BestProductComponent implements OnInit {
  bestProducts: Product[] = [];
  productList: Product[];
  p_code: string;
  options: any;
  constructor(
    private productService: ProductService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.options = {
      dots: false,
      responsive: {
        "0": { items: 1, margin: 5 },
        "430": { items: 2, margin: 5 },
        "550": { items: 3, margin: 5 },
        "670": { items: 4, margin: 5 }
      },
      autoplay: true,
      loop: true,
      autoplayTimeout: 3000,
      lazyLoad: true
    };
    this.getAllProducts();
  }

  getAllProducts() {
    if(this.tokenService.isToken("productListToken")){
      this.productList = this.tokenService.getToken("productListToken");
    }else{

      this.productService.getProducts()
      .subscribe((productList : Product[]) => {
        this.tokenService.saveToken("productListToken" , productList );
        this.productList = productList;
      })
    }
  }

  setProductCode(p_code: string) {
     this.productService.setProductCode(p_code);
     if(this.tokenService.isToken("pcodeToken")){
       this.tokenService.removeToken("pcodeToken");
     }
     this.tokenService.saveToken("pcodeToken", p_code);
     this.p_code = p_code;
  }
}
