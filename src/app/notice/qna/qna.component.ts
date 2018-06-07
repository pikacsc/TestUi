import { Component, OnInit } from '@angular/core';

import { QnaService } from '../../shared/services/qna.service';
import { Qna } from '../../shared/models/qna';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.css']
})
export class QnaComponent implements OnInit {
  qnas: Qna[];

  constructor(private qnaService: QnaService) { }

  ngOnInit() {
    this.qnaService.getQna()
      .subscribe((qnas: Qna[]) => {
        this.qnas = qnas;
      })
  }

}
