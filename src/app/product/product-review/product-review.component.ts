import { Component, OnInit } from '@angular/core';

import { ReviewService} from "../../shared/services/review.service";
import {Review} from "../../shared/models/Review";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {

  page = 1;
  reviews : Review[];
  p_code : string;


  constructor(
    private reviewService : ReviewService,
    private productService : ProductService

  ) { }

  ngOnInit() {

    this.productService.getReview()
    .subscribe((reviews: Review[])=>{
      this.reviews = reviews;
    })

  }

  setReviewNo(rev_no : number){
    this.reviewService.setReviewNo(rev_no);
  }





}
