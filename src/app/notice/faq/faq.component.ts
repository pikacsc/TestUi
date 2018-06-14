import { Component, OnInit } from '@angular/core';

import { FaqService } from '../../shared/services/faq.service';
import { Faq } from '../../shared/models/faq';

import { SearchService } from '../../shared/services/search.service';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  page = 1;
  faqList: Faq[];
  search = '';

  constructor(
    private faqService: FaqService,
    private searchService: SearchService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    if(this.tokenService.isToken("faqToken")) {
      this.faqList = this.tokenService.getToken("faqToken");
    } else {
      this.faqService.getFaqList()
        .subscribe((faqs: Faq[]) => {
          this.tokenService.saveToken("faqToken", faqs);
          this.faqList = faqs;
        })
    }
  }

  setFaqNo(f_no: number) {
    this.faqService.setFaqNo(f_no);
    this.setFaqNoObject(f_no);

    if(this.tokenService.isToken("faqDetailToken")) {
      this.tokenService.removeToken("faqDetailToken");
    }
    this.tokenService.saveToken("faqDetailToken", f_no);
  }

  setFaqNoObject(f_no: number) {
    var faq = this.faqList.find(function (item){
      return item.f_no === f_no;
    });
    this.faqService.setFaqNoObject(faq);
  }

  searchTerm() {
    if (this.search == '' || this.search == 'search') {
      this.faqService.getFaqList()
        .subscribe((faqs: Faq[]) => {
          this.faqList = faqs;
        });
    } else {
      this.searchService.faqSearch(this.search)
        .subscribe((faqs: Faq[]) => {
          this.faqList = faqs;
        });
    }
  }

}
