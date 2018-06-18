import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { QnaService } from '../../shared/services/qna.service';
import { Qna } from '../../shared/models/qna';
// import { TokenService } from '../../shared/services/token.service';

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
    // private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.qna = this.qnaService.getQnaObject();

    // if(this.qna == null) {
    //   var q_no = this.tokenService.getToken("qnaDetailToken");
    //   var qnaList = this.tokenService.getToken("qnaToken");
    //   var qna = qnaList.find(function(item) {
    //     return item.q_no == q_no;
    //   });
    //   this.qna = qna;
    // }
  }

  updateQna(form: NgForm) {
    this.qnaService.updateQna(this.qna)
      .subscribe(() => {
        alert("질문이 수정되었습니다.");
        // this.tokenService.removeToken("qnaToken");
        this.router.navigate(["/notice/qna"]);
      });
  }

}
