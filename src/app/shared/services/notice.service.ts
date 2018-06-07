import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Notice } from "../models/notice";

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  notices: any;
  private url = 'http://localhost:8080/toma/notice';

  constructor(private http: HttpClient) {

  }

  getNotice() {
    return this.http.get(this.url);
    // return this.notices = this.http.get(this.url);
  }
}
