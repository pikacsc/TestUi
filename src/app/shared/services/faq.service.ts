import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Faq } from "../models/faq";

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  faqs: any;
  private url = 'http://localhost:8080/toma/faq';

  constructor(private http: HttpClient) { }

  getFaq() {
    return this.http.get(this.url);
  }
}
