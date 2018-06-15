import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Faq } from "../models/faq";

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  faqs: any;
  faq: Faq;
  f_no: number;
  private url = 'http://localhost:8080/toma/faq';
  private detailUrl = 'http://localhost:8080/toma/detail/faq/';

  constructor(private http: HttpClient) { }

  incrementFaqHits(faq: Faq) {
    return this.http.put(this.detailUrl + this.f_no, faq);
  }

  getFaqList() {
    return this.http.get(this.url);
  }

  getFaqCategory(f_category: string) {
    return this.http.get(this.url + "/" + f_category);
  }

  getFaqNoObject() {
    return this.faq;
  }

  setFaqNo(f_no: number) {
    this.f_no = f_no;
  }

  setFaqNoObject(faq: Faq) {
    this.incrementFaqHits(faq).subscribe(()=>{
      this.faq = faq;
    });
  }

  checkFaq(faq: Faq) {
    if(this.faq == faq) {
      return this.faq;
    } else {
      return this.faq = faq;
    }
  }
}
