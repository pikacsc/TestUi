import { Component, OnInit } from '@angular/core';
import { QnaService } from '../../shared/services/qna.service';
import { Qna } from '../../shared/models/qna';
import { AuthService } from '../../shared/services/auth.service';
import { SearchService } from '../../shared/services/search.service';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.css']
})
export class QnaComponent implements OnInit {
  page = 1;
  qnaList: Qna[];
  qna: Qna;
  u_id: string;
  search: string;
  number: number = 1;

  constructor(
    private qnaService: QnaService,
    private authService: AuthService,
    private searchService: SearchService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.u_id = this.authService.getLoggedInUser().uid;

    this.qnaService.getQnaList(this.u_id)
      .subscribe((qnas: Qna[]) => {
        this.tokenService.saveToken("qnaToken", qnas);
        this.qnaList = qnas;
      });
  }

  setQnaNo(q_no: number) {
    this.qnaService.setQnaNo(q_no);
    this.setQnaNoObject(q_no);

    if( this.tokenService.isToken("qnaDetailToken")) {
      this.tokenService.removeToken("qnaDetailToken");
    }
    this.tokenService.saveToken("qnaDetailToken", q_no);
   }

  setQnaNoObject(q_no: number) {
    var qna = this.qnaList.find(function(item) {
      return item.q_no == q_no;
    });
    this.qnaService.setQnaObject(qna);
  }

  searchTerm() {
    if (this.search == '' || this.search == 'search') {
      this.qnaService.getQnaList(this.u_id)
        .subscribe((qnas: Qna[]) => {
          this.qnaList = qnas;
        });
    } else {
      this.searchService.qnaSearch(this.search)
        .subscribe((qnas: Qna[]) => {
          this.qnaList = qnas;
        });
    }
  }

}
