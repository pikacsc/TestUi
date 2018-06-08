import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Notice } from "../models/notice";

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  notices: any;
  n_no: number;
  url = 'http://localhost:8080/toma/notice';
  detailUrl = 'http://localhost:8080/toma/detail/notice/';

  constructor(private http: HttpClient) {

  }

  getNotice() {
    return this.http.get(this.url);
    // return this.notices = this.http.get(this.url);
  }

  getNoticeNo() {
    return this.http.get(this.detailUrl + this.n_no);
  }

  setNoticeNo(n_no: number) {
    this.n_no = n_no;
  }

}
