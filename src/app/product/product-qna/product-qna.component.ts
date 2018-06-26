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
  pq_no : number;


  constructor(
    private productQnaService : ProductQnaService,
    private productService : ProductService,
    private tokenService: TokenService

  ) { }

  ngOnInit() {


      this.productService.getProductQna()
      .subscribe((productQnas :ProductQna[] )=>
    {
        this.productQnas = productQnas;
    })


  }

  setProductQnaNo(pq_no : number){
    this.productQnaService.setProductQnaNo(pq_no);
    this.setProductQnaNoObject(pq_no);
  }


  setProductQnaNoObject(pq_no: number) {
    var productQna = this.productQnas.find(function (item){
      return item.pq_no == pq_no;
    });
    this.productQnaService.setProductQnaNoObject(productQna);
    // this.check(review);
  }


}
