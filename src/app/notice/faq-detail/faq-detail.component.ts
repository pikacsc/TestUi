import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

import { FaqService } from '../../shared/services/faq.service';
import { Faq } from '../../shared/models/faq';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.css']
})
export class FaqDetailComponent implements OnInit {
  faq: Faq;

  constructor(
    private faqService: FaqService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.faqService.getFaqNo()
      .subscribe((faq:Faq) => {
        this.faq = faq;
      })
  }

}
