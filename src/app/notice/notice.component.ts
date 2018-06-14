import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NoticeService } from '../shared/services/notice.service';
import { Notice } from '../shared/models/notice'

import { SearchService } from '../shared/services/search.service';
import { TokenService } from '../shared/services/token.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  page = 1;
  noticeList: Notice[];
  search = '';

  constructor(
    private noticeService: NoticeService,
    private router: Router,
    private searchService: SearchService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    if (this.tokenService.isToken("noticeToken")) {
      this.noticeList = this.tokenService.getToken("noticeToken");
    } else {
      this.noticeService.getNoticeList()
        .subscribe((noticeList: Notice[]) => {
          this.tokenService.saveToken("noticeToken", noticeList);
          this.noticeList = noticeList;
        });
    }

  }

  setNoticeNo(n_no: number) {
    this.noticeService.setNoticeNo(n_no);
    this.setNoticeNoObject(n_no);

    if(this.tokenService.isToken("noticeDetailToken")) {
      this.tokenService.removeToken("noticeDetailToken");
    }
    this.tokenService.saveToken("noticeDetailToken", n_no);
  }

  setNoticeNoObject(n_no: number) {
    var notice = this.noticeList.find(function (item) {
      return item.n_no === n_no;
    });
    this.noticeService.setNoticeNoObject(notice);
  }

  searchTerm() {
    if (this.search == '' || this.search == 'search') {
      this.noticeService.getNoticeList()
        .subscribe((noticeList: Notice[]) => {
          this.noticeList = noticeList;
        });
    } else {
      this.searchService.noticeSearch(this.search)
        .subscribe((noticeList: Notice[]) => {
          this.noticeList = noticeList;
        });
    }
  }

}
