import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

import { ProductQnaService } from "../../shared/services/product-qna.service";
import { ProductQna } from "../../shared/models/ProductQna";
import { TokenService } from '../../shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-qna-detail',
  templateUrl: './product-qna-detail.component.html',
  styleUrls: ['./product-qna-detail.component.css']
})
export class ProductQnaDetailComponent implements OnInit {

  productQna: ProductQna;

  constructor(
    private productQnaService: ProductQnaService,
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.productQnaService.getProductQnaNoObject().subscribe((productQna: ProductQna) => {
      this.tokenService.saveToken("productQnaToken", productQna);
      this.productQna = productQna;
      return this.productQna;
    });
  }

  setProductQnaObject() {
    this.productQna = this.tokenService.getToken("productQnaToken");
    this.productQnaService.setProductQnaObject(this.productQna);
  }

  deleteProductQna(productQna: ProductQna) {
    this.productQnaService.deleteProductQna(this.productQna)
      .subscribe(() => {
        alert("고객님의 상품문의가 삭제되었습니다.");
        this.router.navigate(['/products/product', this.productQna.p_code]);
      });
  }

}
