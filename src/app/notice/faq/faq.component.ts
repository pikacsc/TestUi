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
  categoryList = ["전체조회", "배송", "환불", "기타"];
  faqList: Faq[];
  search = '';

  constructor(
    private faqService: FaqService,
    private searchService: SearchService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    // if(this.tokenService.isToken("faqToken")) {
    //   this.tokenService.removeToken("faqToken");
    // } else {
    this.faqService.getFaqList()
      .subscribe((faqs: Faq[]) => {
        this.tokenService.saveToken("faqToken", faqs);
        this.faqList = faqs;
      });
    // }
  }

  getFaqByCategory(f_category: string) {
    if (f_category == "전체조회" || f_category == "") {
      // this.faqList = this.tokenService.getToken("faqToken");
      this.faqService.getFaqList()
        .subscribe((faqs: Faq[]) => {
          // this.tokenService.saveToken("faqToken", faqs);
          this.faqList = faqs;
        });
    } else {
      this.faqService.getFaqCategory(f_category)
        .subscribe((faqList: Faq[]) => {
          this.faqList = faqList;
        });
    }
  }

  setFaqNo(f_no: number) {
    this.faqService.setFaqNo(f_no);
    this.setFaqNoObject(f_no);

    if (this.tokenService.isToken("faqDetailToken")) {
      this.tokenService.removeToken("faqDetailToken");
    }
    this.tokenService.saveToken("faqDetailToken", f_no);
  }

  setFaqNoObject(f_no: number) {
    var faq = this.faqList.find(function(item) {
      return item.f_no === f_no;
    });
    this.faqService.setFaqNoObject(faq);
    this.check(faq);
  }

  check(faq: Faq) {
    this.faqService.checkFaq(faq);
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
