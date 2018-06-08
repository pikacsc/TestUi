import { Component, OnInit } from '@angular/core';

import { NoticeService } from '../shared/services/notice.service';
import { Notice } from '../shared/models/notice'

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  page = 1;
  notices: Notice[];
  search: string;

  constructor(private noticeService: NoticeService) { }

  ngOnInit() {
    this.noticeService.getNotice()
      .subscribe((notices:Notice[]) => {
        this.notices = notices;
      });
  }

  setNoticeNo(n_no: number) {
    this.noticeService.setNoticeNo(n_no);
  }

}
