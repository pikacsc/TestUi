import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";

import { QnaService } from '../../shared/services/qna.service';
import { Qna } from '../../shared/models/qna';

@Component({
  selector: 'app-qna-detail',
  templateUrl: './qna-detail.component.html',
  styleUrls: ['./qna-detail.component.css']
})
export class QnaDetailComponent implements OnInit {
  qna: Qna;

  constructor(
    private qnaService: QnaService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.qnaService.getQnaNo()
      .subscribe((qna: Qna) => {
        this.qna = qna;
      });
  }

  setQnaObject() {
    this.qnaService.setQnaObject(this.qna);
  }

  deleteQna(q_no: number) {
    return this.qnaService.deleteQna(q_no)
      .subscribe(() => {
        alert("고객님의 질문이 삭제되었습니다.");
        this.router.navigate(["notice/qna"]);
      });
  }
}
