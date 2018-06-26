import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ReviewService } from '../../shared/services/review.service';
import { Review } from '../../shared/models/review';

@Component({
  selector: 'app-product-review-update',
  templateUrl: './product-review-update.component.html',
  styleUrls: ['./product-review-update.component.css']
})
export class ProductReviewUpdateComponent implements OnInit {

  review : Review;

  constructor(
    private reviewService : ReviewService,
    private router: Router


  ) { }

  ngOnInit() {

    this.review = this.reviewService.getReviewObject();

  }

  updateReview(form : NgForm){

    // console.log(this.review.rev_no);
    // console.log(this.review.u_id);
    // console.log(this.review.rev_title);
    // console.log(this.review.rev_content);



    this.reviewService.updateReview(this.review)
    .subscribe(()=>{
      alert("상품 후기가 수정되었습니다.");
      this.router.navigate(['/products/review', this.review.rev_no]);
    })
  }


}
