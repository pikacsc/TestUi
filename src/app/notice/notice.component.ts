import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NoticeService } from '../shared/services/notice.service';
import { Notice } from '../shared/models/notice'

import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  page = 1;
  notices: Notice[];
  search = '';

  constructor(
    private noticeService: NoticeService,
    private router: Router,
    private searchService: SearchService
  ) {
  }

  ngOnInit() {
    this.noticeService.getNotice()
      .subscribe((notices: Notice[]) => {
        this.notices = notices;
      });
  }

  setNoticeNo(n_no: number) {
    this.noticeService.setNoticeNo(n_no);
  }

  searchTerm() {
    if (this.search == '' || this.search == 'search') {
      this.noticeService.getNotice()
        .subscribe((notices: Notice[]) => {
          this.notices = notices;
        });
    } else {
      this.searchService.noticeSearch(this.search)
        .subscribe((notices: Notice[]) => {
          this.notices = notices;
        });
    }
  }

}
