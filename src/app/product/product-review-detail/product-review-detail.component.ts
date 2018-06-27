import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

import { ReviewService} from "../../shared/services/review.service";
import {Review} from "../../shared/models/Review";
import { TokenService } from '../../shared/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-product-review-detail',
  templateUrl: './product-review-detail.component.html',
  styleUrls: ['./product-review-detail.component.css']
})
export class ProductReviewDetailComponent implements OnInit {

  review : Review;
  u_id : string;

  constructor(

    private reviewService : ReviewService,
    private http : HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService


  ) { }

  ngOnInit() {

      this.reviewService.getReviewNoObject().subscribe((review: Review)=>{
      this.tokenService.saveToken("reviewToken",review);
      this.review = review;
      return this.review;
      })

      this.u_id = this.authService.getLoggedInUser().uid;

  }

  setReviewObject(){
    this.review = this.tokenService.getToken("reviewToken");
    this.reviewService.setReviewObject(this.review);
  }



  deleteReview(review : Review){

    if(this.review.u_id == this.u_id){

      this.reviewService.deleteReview(this.review)
      .subscribe(()=>{
        alert("고객님의 상품후기가 삭제되었습니다.");
        this.router.navigate(['/products/product', this.review.p_code]);
      })
    }else{
      alert("삭제할 권한이 없습니다.");
    }

  }


}
