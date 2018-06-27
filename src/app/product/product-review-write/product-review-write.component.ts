import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReviewService } from '../../shared/services/review.service';
import { Review } from '../../shared/models/review';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';
import { ProductService } from "../../shared/services/product.service";
import { TokenService } from "../../shared/services/token.service";



@Component({
  selector: 'app-product-review-write',
  templateUrl: './product-review-write.component.html',
  styleUrls: ['./product-review-write.component.css']
})
export class ProductReviewWriteComponent implements OnInit {

  submit = false;
  review = new Review;
  rev_no : number;
  p_code : string;

  constructor(

    private reviewService: ReviewService,
    private router: Router,
    private authService: AuthService,
    private productService : ProductService,
    private tokenService: TokenService,

  ) { }

  ngOnInit() {

    this.review.u_id = this.authService.getLoggedInUser().uid;



  }

  insertProductReview(){
    this.review.p_code = this.tokenService.getToken("p_code");
    this.reviewService.insertReview(this.review)
    .subscribe(()=>{
      alert("후기가 등록되었습니다.");
      this.router.navigate(['/products/product', this.review.p_code]);
    })
  }

  setProductCode(p_code: string) {

    if(this.tokenService.isToken("p_code")){
      this.p_code = this.tokenService.getToken("p_code");
    }
    console.log(p_code);
  }


}
