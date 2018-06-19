import { Component, OnInit } from '@angular/core';
import { Qna } from '../../../shared/models/qna';
import { QnaService } from '../../../shared/services/qna.service';

@Component({
  selector: 'app-admin-qna',
  templateUrl: './admin-qna.component.html',
  styleUrls: ['./admin-qna.component.css']
})
export class AdminQnaComponent implements OnInit {
      displayDialog: boolean;
      selectedQna: Qna;
      qnaList: Qna[];
      page = 1;
      q_no:String;

      constructor(private qnaService: QnaService) { }

      ngOnInit() {
          this.qnaService.getAllQnaList()
          .subscribe((qnaList: Qna[]) => {
            this.qnaList = qnaList;
          })
      }

      public show:boolean = false;
        public buttonName:any = 'Show';

     public isCollapsed = false;

}
