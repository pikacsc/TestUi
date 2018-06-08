import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QnaService } from '../../shared/services/qna.service';
import { Qna } from '../../shared/models/qna';

@Component({
  selector: 'app-qna-write',
  templateUrl: './qna-write.component.html',
  styleUrls: ['./qna-write.component.css']
})
export class QnaWriteComponent implements OnInit {
  submit = false;
  qna = new Qna;
  q_no: number;

  constructor(
    private qnaService: QnaService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  insertQna() {
    this.submit = true;
    this.qnaService.insertQna(this.qna)
      .subscribe(() => {
        alert("질문이 등록되었습니다.");
        this.router.navigate(["/notice/qna"]);
      });
  }

}
