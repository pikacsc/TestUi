import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Faq } from "../models/faq";

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  faqs: any;
  f_no: number;
  private url = 'http://localhost:8080/toma/faq';
  private detailUrl = 'http://localhost:8080/toma/detail/faq/';

  constructor(private http: HttpClient) { }

  getFaq() {
    return this.http.get(this.url);
  }

  getFaqNo() {
    return this.http.get(this.detailUrl + this.f_no);
  }

  setFaqNo(f_no: number) {
    this.f_no = f_no;
  }
}
