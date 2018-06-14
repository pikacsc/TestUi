import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private url = 'http://localhost:8080/toma';

  constructor(
    private http: HttpClient
  ) { }

  noticeSearch(title: string) {
    return this.http.get(this.url + "/notice/search/" + title);
  }

  faqSearch(title: string) {
    return this.http.get(this.url + "/faq/search/" + title);
  }

  qnaSearch(title: string) {
    return this.http.get(this.url + "/qna/search/" + title);
  }
}
