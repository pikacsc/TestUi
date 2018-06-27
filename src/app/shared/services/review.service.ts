import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Review } from "../models/Review";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviews: any;
  rev_no: number;
  p_code: string;
  review: Review;
  u_id: string;
  review_update: Review;

  private url = 'http://localhost:8080/toma/review/';

  constructor(private http: HttpClient, private productService: ProductService) { }

  getReview() {
    return this.http.get(this.url + this.p_code);
  }

  setReviewNo(rev_no: number) {
    this.rev_no = rev_no;
  }

  setProductCode() {
    this.p_code = this.productService.getProductCode();
  }

  setReviewNoObject(review: Review) {
    this.incrementReviewHits(review).subscribe(() => {
      this.review = review;
    });
  }

  setReviewObject(review_update: Review) {
    this.review_update = review_update;
  }

  getReviewObject() {
    return this.review_update;
  }

  incrementReviewHits(review: Review) {
    return this.http.put(this.url + this.rev_no, review);
  }

  getReviewNoObject() {
    return this.http.get(this.url + "detail/" + this.rev_no);
  }


  insertReview(review: Review) {
    return this.http.post(this.url + "write", review);
  }

  updateReview(review_update: Review): Observable<any> {
    return this.http.post(this.url + "update", review_update)
      .catch(this.handleError);
  }

  deleteReview(review: Review) {
    return this.http.post(this.url + "delete", review);
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
