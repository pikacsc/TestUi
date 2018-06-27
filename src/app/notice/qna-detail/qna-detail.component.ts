import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";

import { QnaService } from '../../shared/services/qna.service';
import { Qna } from '../../shared/models/qna';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-qna-detail',
  templateUrl: './qna-detail.component.html',
  styleUrls: ['./qna-detail.component.css']
})
export class QnaDetailComponent implements OnInit {
  qna: Qna;
  reply = 'n';

  constructor(
    private qnaService: QnaService,
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.qna = this.qnaService.getQnaObject();

    if (this.qna == null) {
      var q_no = this.tokenService.getToken("qnaDetailToken")
      var qnaList = this.tokenService.getToken("qnaToken");
      var qna = qnaList.find(function(item) {
        return item.q_no === q_no;
      });
      var q_content = qna.q_content;
      qna.q_content = qna.q_content.replace("\r\n", "<br>");
      this.qna = qna;
    }

    if(this.qna.q_reply == this.reply) {
      this.reply = 'N';
    } else {
      this.reply = "답변 완료"
    }
  }




  setQnaObject() {
    this.qnaService.setQnaObject(this.qna);
  }

  deleteQna(q_no: number) {
    var confirm = window.confirm('질문을 삭제하시겠습니까?');
    if (confirm) {
      return this.qnaService.deleteQna(q_no)
        .subscribe(() => {
          alert("고객님의 질문이 삭제되었습니다.");
          // this.tokenService.removeToken("qnaToken");
          this.router.navigate(["notice/qna"]);
        });
    } else {
      return;
    }
  }
}
