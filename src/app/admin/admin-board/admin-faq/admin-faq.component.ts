import { Component, OnInit } from '@angular/core';
import { Faq } from '../../../shared/models/faq';
import { FaqService } from '../../../shared/services/faq.service';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-admin-faq',
  templateUrl: './admin-faq.component.html',
  styleUrls: ['./admin-faq.component.css']
})
export class AdminFAQComponent implements OnInit {
  source: LocalDataSource;
  faqList: Faq[];
  settings = {
  mode: 'external',
  actions: {
    delete: 'false',
    columnTitle:'FAQ'
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
    f_no: {
      title: '번호'
    },
    f_category: {
      title: '카테고리'
    },
    f_title: {
      title: '제목'
    },
    a_id: {
      title: '작성자'
    },
    f_hits: {
      title: '조회수'
    },
    f_date: {
      title: '작성날짜'
    }
  }
  };


  lastFaqNo :number;
  nextFaqNo :number;
  navFaq = new Faq;
  navState:string;
    constructor(
      private tokenService:TokenService,
      private FaqService:FaqService,
      private http:HttpClient
    ) {}


  editFaq = new Faq;



  editDataBinding(event){
    this.editFaq.f_no = event.data.f_no;
    this.editFaq.f_category = event.data.f_category;
    this.editFaq.f_title = event.data.f_title;
    this.editFaq.f_content = event.data.f_content;
    this.editFaq.a_id = event.data.a_id;
    this.editFaq.f_hits = event.data.f_hits;
    this.editFaq.f_date = event.data.f_date;
  }


  updateFaq(event){
     this.navState = 'FAQ 수정';
     this.editDataBinding(event);
     this.navFaq = this.editFaq;
     this.openNav();
  }

  createFaq(){
    this.navState = 'FAQ 글쓰기';
    this.navFaq = new Faq;
    this.navFaq.a_id = this.tokenService.getToken("adminToken").a_id;
    this.navFaq.f_date = new Date();
    this.navFaq.f_hits = 0;
    this.openNav();
  }

  confirmCreate(){
        this.http.post<Faq>('http://localhost:8080/toma/faq/create', this.navFaq).subscribe(
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
        this.http.put<Faq>('http://localhost:8080/toma/faq/update', this.navFaq).subscribe(
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
            this.http.delete<any>('http://localhost:8080/toma/faq/delete/'+this.navFaq.f_no).subscribe(
                res => {
                  console.log(res);
                  //event.confirm.resolve(event.newData);
                  alert("삭제 됐습니다.");
                  this.closeNav();
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




    openNav() {
        document.getElementById("mySidenav").style.width = "650px";
        document.body.style.marginLeft = "650px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.body.style.marginLeft = "0";
    }

  navFaqReset(){
     this.navFaq = this.editFaq;
  }


  ngOnInit() {
    this.FaqService.getFaqList()
    .subscribe((faqList : Faq[]) => {
      this.faqList = faqList;
      this.lastFaqNo = this.faqList[0].f_no; // 최신 게시글의 번호값 가져오기
      this.nextFaqNo = this.lastFaqNo+1; // 다음 게시글의 번호값 준비
    })
  }

}
