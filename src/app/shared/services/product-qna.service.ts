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
  productQna : ProductQna;
  productQna_update : ProductQna;
  u_id : string;

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

  setProductQnaNo(pq_no : number){
    this.pq_no = pq_no;
  }


  setProductQnaObject(productQna_update : ProductQna){
    this.productQna_update = productQna_update;
  }

  getProductQnaObject(){
    return this.productQna_update;
  }


  incrementProductQnaHits(productQna: ProductQna) {
    return this.http.put(this.url + this.pq_no, productQna);
  }


  setProductQnaNoObject(productQna : ProductQna){

    this.incrementProductQnaHits(productQna).subscribe(()=>{
      this.productQna = productQna;
    });

  }

  getProductQnaNoObject(){
  return this.http.get(this.url + "detail/" + this.pq_no);
 }

 insertProductQna(productQna : ProductQna){
   return this.http.post(this.url + "write", productQna);
 }

 updateProductQna(productQna_update: ProductQna):Observable<any> {
   return this.http.put(this.url + "update" , productQna_update)
     .catch(this.handleError);
 }

deleteProductQna( productQna : ProductQna){
  return this.http.post(this.url + "delete" , productQna);
}

private handleError( error: Response | any) {
  console.error(error.message || error);
  return Observable.throw(error.status);
}



}
