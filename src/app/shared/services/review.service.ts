import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {Review} from "../models/Review";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviews : any;
  rev_no: number;
  p_code : string;

  private url = 'http://localhost:8080/toma/review/';

  constructor(private http: HttpClient, private productService : ProductService) { }

  getReview(){
    return this.http.get(this.url + this.p_code);
  }

  setReviewNo(rev_no : number){
    this.rev_no = rev_no;
  }

  setProductCode(){
    this.p_code = this.productService.getProductCode();
  }


}
