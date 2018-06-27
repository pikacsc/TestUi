import { Component, OnInit } from '@angular/core';

import { ReviewService } from "../../shared/services/review.service";
import { Review } from "../../shared/models/Review";
import { ProductService } from "../../shared/services/product.service";
import { TokenService } from "../../shared/services/token.service";


@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {

  page = 1;
  reviews: Review[];
  p_code: string;
  rev_no: number;

  constructor(
    private reviewService: ReviewService,
    private productService: ProductService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.productService.getReview()
      .subscribe((reviews: Review[]) => {
        // this.tokenService.saveToken("productReviewToken", reviews);
        this.reviews = reviews;
      });
  }

  setReviewNo(rev_no: number) {
    // this.reviewService.setReviewNo(rev_no);
    this.reviewService.setReviewNo(rev_no);
    this.setReviewNoObject(rev_no);

    if (this.tokenService.isToken("rev_no")) {
      this.tokenService.removeToken("rev_no");
    } else {
      this.tokenService.saveToken("rev_no", rev_no);
    }

    // this.rev_no = rev_no;
    // this.setReviewNoObject(rev_no);
  }

  setReviewNoObject(rev_no: number) {
    var review = this.reviews.find(function(item) {
      return item.rev_no == rev_no;
    });
    this.reviewService.setReviewNoObject(review);
    // this.check(review);
  }
}
