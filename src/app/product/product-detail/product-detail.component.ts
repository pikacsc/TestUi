import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";
import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  private sub: any;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinnerService: LoaderSpinnerService
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   const id = params["id"]; // (+) converts string 'id' to a number
    //   this.getProductDetail(id);
    // });

   this.productService.getProductById()
   .subscribe((product : Product) =>
    {this.product = product;})


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


}
