import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

import { NoticeService } from '../../shared/services/notice.service';
import { Notice } from '../../shared/models/notice';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.css']
})
export class NoticeDetailComponent implements OnInit {
  notice: Notice;

  constructor(
    private noticeService: NoticeService,
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.notice = this.noticeService.getNoticeNoObject();

    if(this.notice == null) {
      var n_no = this.tokenService.getToken("noticeDetailToken");
      var noticeList = this.tokenService.getToken("noticeToken");
      var notice = noticeList.find(function(item){
        return item.n_no === n_no;
      });
      var n_content = notice.n_content;
      notice.n_content = notice.n_content.replace("\r\n","<br>");
      this.notice = notice;
    }
  }

}
