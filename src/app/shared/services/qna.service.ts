import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Qna } from "../models/qna";

@Injectable({
  providedIn: 'root'
})
export class QnaService {
  qnas: any;
  qna: Qna;
  q_no: number;
  private url = 'http://localhost:8080/toma/qna';
  private detailUrl = 'http://localhost:8080/toma/detail/qna/';

  constructor(private http: HttpClient) { }

  setQnaNo(q_no: number) {
    this.q_no = q_no;
  }

  getQna() {
    return this.http.get(this.url);
  }

  getQnaNo() {
    return this.http.get(this.detailUrl + this.q_no);
  }

  insertQna(qna: Qna) {
    return this.http.post(this.url + "/write", qna);
  }

  deleteQna(q_no: number) {
    return this.http.delete(this.url + "/" + this.q_no);
  }
}
