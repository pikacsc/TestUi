import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductQnaService } from '../../shared/services/product-qna.service';
import { ProductQna } from '../../shared/models/productQna';
import { AuthService } from '../../shared/services/auth.service';
import { ProductService } from "../../shared/services/product.service";
import { User } from '../../shared/models/user';
import { TokenService } from "../../shared/services/token.service";

@Component({
  selector: 'app-product-qna-write',
  templateUrl: './product-qna-write.component.html',
  styleUrls: ['./product-qna-write.component.css']
})
export class ProductQnaWriteComponent implements OnInit {

  submit = false;
  productQna = new ProductQna;
  pq_no : number;
  p_code : string;

  categoryList = ["상품","배송"];

  constructor(

    private productQnaService : ProductQnaService,
    private router : Router,
    private authService : AuthService,
    private productService : ProductService,
    private tokenService: TokenService

  ) { }

  ngOnInit() {

    this.productQna.u_id = this.authService.getLoggedInUser().uid;
    console.log(this.productQna.p_code);

  }

  getProductQnaByCategory(pq_category : string ){
    this.productQna.pq_category = pq_category;
  }


  insertProductQna(){
    this.productQna.p_code = this.tokenService.getToken("p_code");
    this.productQnaService.insertProductQna(this.productQna)
    .subscribe(()=>
  {
    alert("질문이 등록되었습니다.");
    console.log(this.productQna.pq_category);
    this.router.navigate(['/products/product', this.productQna.p_code]);
  })
  }

  setProductCode(p_code: string) {

    if(this.tokenService.isToken("p_code")){
      this.p_code = this.tokenService.getToken("p_code");
    }
    console.log(p_code);
  }



}
