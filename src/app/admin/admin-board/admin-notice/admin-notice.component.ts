import { Component, OnInit } from '@angular/core';
import { Notice } from '../../../shared/models/notice';
import { NoticeService } from '../../../shared/services/notice.service';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../../shared/services/token.service';
import { SidenavService } from '../../../shared/services/sidenav.service';
@Component({
  selector: 'app-admin-notice',
  templateUrl: './admin-notice.component.html',
  styleUrls: ['./admin-notice.component.css']
})
export class AdminNoticeComponent implements OnInit {
  source: LocalDataSource;
  noticeList: Notice[];
  settings = {
  mode: 'external',
  actions: {
    delete: 'false',
    columnTitle:'공지사항'
  },
  add: {
    confirmCreate: 'true',
    addButtonContent: '글쓰기'
  },
  edit: {
    saveButtonContent: '확인',
    editButtonContent: '수정',
    cancelButtonContent: '취소',
    confirmSave: 'true'
  },
  delete: {
    deleteButtonContent: '',
    confirmDelete: 'true'
  },
  columns: {
    n_no: {
      title: '번호',
      width: '5%'
    },
    n_category: {
      title: '카테고리',
      width: '5%'
    },
    n_title: {
      title: '제목',
      width: '30%'
    },
    a_id: {
      title: '작성자',
      width: '10%'
    },
    n_hits: {
      title: '조회수',
      width: '5%'
    },
    n_date: {
      title: '작성날짜'
    }
  }
  };


  lastNoticeNo :number;
  nextNoticeNo :number;
  navNotice = new Notice;
  navState:string;
    constructor(
      private tokenService:TokenService,
      private noticeService:NoticeService,
      private sideNavService:SidenavService,
      private http:HttpClient
    ) {}


  editNotice = new Notice;



  editDataBinding(event){
    this.editNotice.n_no = event.data.n_no;
    this.editNotice.n_category = event.data.n_category;
    this.editNotice.n_title = event.data.n_title;
    this.editNotice.n_content = event.data.n_content;
    this.editNotice.a_id = event.data.a_id;
    this.editNotice.n_hits = event.data.n_hits;
    this.editNotice.n_date = event.data.n_date;
  }


  updateNotice(event){
     this.navState = '공지사항 수정';
     this.editDataBinding(event);
     this.navNotice = this.editNotice;
     this.sideNavService.openNav();
  }

  createNotice(){
    this.navState = '공지사항 글쓰기';
    this.navNotice = new Notice;
    this.navNotice.a_id = this.tokenService.getToken("adminToken").a_id;
    this.navNotice.n_date = new Date();
    this.navNotice.n_hits = 0;
    this.sideNavService.openNav();
  }

  confirmCreate(){
        this.http.post<Notice>('http://localhost:8080/toma/notice/create', this.navNotice).subscribe(
            res => {
              console.log(res);
              //event.confirm.resolve(event.newData);
              alert("등록 됐습니다.");
              this.ngOnInit();
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              alert("Client-side error occured.");
            } else {
              alert("Server-side error occured.");
            }
          });
  }



  confirmEdit(){
        this.http.put<Notice>('http://localhost:8080/toma/notice/update', this.navNotice).subscribe(
            res => {
              console.log(res);
              //event.confirm.resolve(event.newData);
              alert("수정 됐습니다.");
              this.ngOnInit();
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              alert("Client-side error occured.");
            } else {
              alert("Server-side error occured.");
            }
          });
  }



    confirmDelete(){
          var deleteConfirm = confirm("정말 삭제하시겠습니까?");
          if(deleteConfirm == true){
            this.http.delete<any>('http://localhost:8080/toma/notice/delete/'+this.navNotice.n_no).subscribe(
                res => {
                  console.log(res);
                  //event.confirm.resolve(event.newData);
                  alert("삭제 됐습니다.");
                  this.sideNavService.closeNav();
                  this.ngOnInit();
              },
              (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  alert("Client-side error occured.");
                } else {
                  alert("Server-side error occured.");
                }
              });
          } else {
            return false;
          }
    }



  navnoticeReset(){
     this.navNotice = this.editNotice;
  }


  ngOnInit() {
    this.noticeService.getNoticeList()
    .subscribe((noticeList : Notice[]) => {
      this.noticeList = noticeList;
      this.lastNoticeNo = this.noticeList[0].n_no; // 최신 게시글의 번호값 가져오기

      this.nextNoticeNo = this.lastNoticeNo+1; // 다음 게시글의 번호값 준비

    })
  }

}
