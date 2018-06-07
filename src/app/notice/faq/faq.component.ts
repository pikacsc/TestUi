import { Component, OnInit } from '@angular/core';

import { FaqService } from '../../shared/services/faq.service';
import { Faq } from '../../shared/models/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqs: Faq[];

  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.faqService.getFaq()
      .subscribe((faqs: Faq[]) => {
        this.faqs = faqs;
      })
  }

}
