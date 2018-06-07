import { Component, OnInit } from '@angular/core';

import { NoticeService } from '../shared/services/notice.service';
import { Notice } from '../shared/models/notice'

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  notices: Notice[];

  constructor(private noticeService: NoticeService) { }

  ngOnInit() {
    this.noticeService.getNotice()
      .subscribe((notices:Notice[]) => {
        this.notices = notices;
      });
  }

}
