import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

import { FaqService } from '../../shared/services/faq.service';
import { Faq } from '../../shared/models/faq';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.css']
})
export class FaqDetailComponent implements OnInit,OnDestroy {
  faq: Faq;

  constructor(
    private faqService: FaqService,
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.faq = this.faqService.getFaqNoObject();

    if(this.faq == null) {
      var f_no = this.tokenService.getToken("faqDetailToken");
      var faqList = this.tokenService.getToken("faqToken");
      var faq = faqList.find(function(item){
        return item.f_no === f_no;
      });
      var f_content = faq.f_content;
      faq.f_content = faq.f_content.replace("\r\n","<br>");
      this.faq = faq;
    }
  }

  ngOnDestroy() {
    this.removeToken();
  }

  removeToken() {
    this.tokenService.removeToken("faqToken");
  }

}
