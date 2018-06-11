import { Component, OnInit } from '@angular/core';

import { QnaService } from '../../shared/services/qna.service';
import { Qna } from '../../shared/models/qna';

import { AuthService } from '../../shared/services/auth.service';

import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.css']
})
export class QnaComponent implements OnInit {
  page = 1;
  qnas: Qna[];
  qna: Qna;
  u_id: string;
  search: string;

  constructor(
    private qnaService: QnaService,
    private authService: AuthService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.u_id = this.authService.getLoggedInUser().uid;
    this.qnaService.getQnaList(this.u_id)
      .subscribe((qnas: Qna[]) => {
        this.qnas = qnas;
      })
  }

  setQnaNo(q_no: number) {
    this.qnaService.setQnaNo(q_no);
  }

  searchTerm() {
    if (this.search == '' || this.search == 'search') {
      this.qnaService.getQnaList(this.u_id)
        .subscribe((qnas: Qna[]) => {
          this.qnas = qnas;
        });
    } else {
      this.searchService.qnaSearch(this.search)
        .subscribe((qnas: Qna[]) => {
          this.qnas = qnas;
        });
    }
  }

}
