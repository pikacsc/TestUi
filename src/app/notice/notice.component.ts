import { Component, OnInit } from '@angular/core';

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
  categoryList = ["전체조회", "공지", "이벤트"];
  noticeList: Notice[];
  search = '';

  constructor(
    private noticeService: NoticeService,
    private searchService: SearchService
  ) {
  }

  ngOnInit() {
    this.noticeService.getNoticeList()
      .subscribe((noticeList: Notice[]) => {
        this.noticeList = noticeList;
      });
  }

  getNoticeByCategory(n_category: string) {
    if (n_category == "전체조회") {
      this.noticeService.getNoticeList()
        .subscribe((noticeList: Notice[]) => {
          this.noticeList = noticeList;
        });
    } else {
      this.noticeService.getNoticeCategory(n_category)
        .subscribe((noticeList: Notice[]) => {
          this.noticeList = noticeList;
        });
    }
  }

  setNoticeNo(n_no: number) {
    this.noticeService.setNoticeNo(n_no);
    this.setNoticeNoObject(n_no);
  }

  setNoticeNoObject(n_no: number) {
    var notice = this.noticeList.find(function(item) {
      return item.n_no === n_no;
    });
    this.noticeService.setNoticeNoObject(notice);
    this.check(notice);
  }

  check(notice: Notice) {
    this.noticeService.checkNotice(notice);
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
