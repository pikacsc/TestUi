import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ProductQnaService } from '../../shared/services/product-qna.service';
import { ProductQna } from '../../shared/models/productQna';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-product-qna-update',
  templateUrl: './product-qna-update.component.html',
  styleUrls: ['./product-qna-update.component.css']
})
export class ProductQnaUpdateComponent implements OnInit {

  productQna : ProductQna;



  constructor(

    private productQnaService : ProductQnaService,
    private router : Router,
    private authService: AuthService

  ) { }

  ngOnInit() {

    this.productQna = this.productQnaService.getProductQnaObject();

  }


  updateProductQna(){

      this.productQnaService.updateProductQna(this.productQna)
      .subscribe(()=>{
        alert("상품 문의가 수정되었습니다.");
        this.router.navigate(['/products/qna',this.productQna.pq_no]);
      })
  }


}
