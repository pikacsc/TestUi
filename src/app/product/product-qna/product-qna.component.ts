import { Component, OnInit } from '@angular/core';

import {ProductQnaService} from "../../shared/services/product-qna.service";
import {ProductQna} from "../../shared/models/ProductQna";
import {ProductService} from "../../shared/services/product.service";
import { TokenService } from "../../shared/services/token.service";


@Component({
  selector: 'app-product-qna',
  templateUrl: './product-qna.component.html',
  styleUrls: ['./product-qna.component.css']
})
export class ProductQnaComponent implements OnInit {

  page = 1;
  productQnas : ProductQna[];
  p_code : string;


  constructor(
    private productQnaService : ProductQnaService,
    private productService : ProductService,
    private tokenService: TokenService

  ) { }

  ngOnInit() {

    if(this.tokenService.isToken("productQnaToken")){
      this.productQnas = this.tokenService.getToken("productQnaToken");
    }else{
      this.productService.getProductQna()
      .subscribe((productQnas :ProductQna[] )=>
    {
      this.tokenService.saveToken("productQnaToken", productQnas);
      this.productQnas = productQnas;
    })
    }

  }

}
