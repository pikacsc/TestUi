import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { QnaService } from '../../shared/services/qna.service';
import { Qna } from '../../shared/models/qna';

@Component({
  selector: 'app-qna-update',
  templateUrl: './qna-update.component.html',
  styleUrls: ['./qna-update.component.css']
})
export class QnaUpdateComponent implements OnInit {
  qna: Qna;

  constructor(
    private qnaService: QnaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.qna = this.qnaService.getQnaObject();
  }

  updateQna(form: NgForm) {
    this.qnaService.updateQna(this.qna)
      .subscribe(() => {
        alert("질문이 수정되었습니다.");
        this.router.navigate(["/notice/qna"]);
      });
  }

}
