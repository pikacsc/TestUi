import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Qna } from "../models/qna";
import { TokenService } from "../../shared/services/token.service";

@Injectable({
  providedIn: 'root'
})
export class QnaService {
  qnas: any;
  qna: Qna;
  q_no: number;
  private url = 'http://localhost:8080/toma/qna';
  private detailUrl = 'http://localhost:8080/toma/detail/qna/';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  setQnaObject(qna: Qna) {
    this.qna = qna;
  }

  setQnaNo(q_no: number) {
    this.q_no = q_no;
  }

  getQnaObject() {
    return this.qna;
  }

  getQnaList(u_id: string) {
    return this.http.get(this.url + "/list/" + u_id);
  }

  getQnaNo() {
    return this.http.get(this.detailUrl + this.q_no);
  }

  insertQna(qna: Qna) {
    return this.http.post(this.url + "/write", qna);
  }

  updateQna(qna: Qna):Observable<any> {
    return this.http.put(this.url + "/update/" + qna.q_no, qna)
      .catch(this.handleError);
  }

  deleteQna(q_no: number) {
    return this.http.delete(this.url + "/" + this.q_no);
  }

  private handleError( error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
