import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Qna } from "../models/qna";

@Injectable({
  providedIn: 'root'
})
export class QnaService {
  qnas: any;
  private url = 'http://localhost:8080/toma/qna';

  constructor(private http: HttpClient) { }

  getQna() {
    return this.http.get(this.url);
  }
}
