import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {ProductQna} from "../models/ProductQna";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class ProductQnaService {

  productQnas : any;
  pq_no : number;
  p_code : string;

  private url = 'http://localhost:8080/toma/productqna/';

  constructor(
    private http: HttpClient,
    private productService : ProductService
  ) { }

  setProductCode(){
    this.p_code = this.productService.getProductCode();
  }

  getProductQna(){
    return this.http.get(this.url + this.p_code);
  }

  setQnaNo(pq_no : number){
    this.pq_no = pq_no;
  }





}
