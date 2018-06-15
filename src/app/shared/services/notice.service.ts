import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Notice } from "../models/notice";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  n_no: number;
  notice: Notice;
  url = 'http://localhost:8080/toma/notice';
  detailUrl = 'http://localhost:8080/toma/detail/notice/';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {

  }

  incrementNoticeHits(notice: Notice) {
    return this.http.put(this.detailUrl + this.n_no, notice);
  }

  getNoticeList() {
    return this.http.get(this.url);
    // return this.notices = this.http.get(this.url);
  }

  getNoticeCategory(n_category: string) {
    return this.http.get(this.url + "/" + n_category);
  }

  getNoticeNoObject() {
    return this.notice;
  }

  setNoticeNo(n_no: number) {
    this.n_no = n_no;
  }

  setNoticeNoObject(notice: Notice) {
    // this.notice = notice;
    this.incrementNoticeHits(notice).subscribe(() => {
      this.notice = notice;
    });
  }

  checkNotice(notice: Notice) {
    if(this.notice == notice) {
      return this.notice;
    } else {
      return this.notice = notice;
    }
  }

}
