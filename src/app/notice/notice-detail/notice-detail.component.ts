import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

import { NoticeService } from '../../shared/services/notice.service';
import { Notice } from '../../shared/models/notice';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.css']
})
export class NoticeDetailComponent implements OnInit {
  notice: Notice;

  constructor(
    private noticeService: NoticeService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.noticeService.getNoticeNo()
      .subscribe((notice:Notice) => {
        this.notice = notice;
      })
  }

}
