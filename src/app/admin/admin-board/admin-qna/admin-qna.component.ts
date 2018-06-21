import { Component, OnInit } from '@angular/core';
import { Qna } from '../../../shared/models/qna';
import { QnaService } from '../../../shared/services/qna.service';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';
import { SidenavService } from '../../../shared/services/sidenav.service';
@Component({
  selector: 'app-admin-qna',
  templateUrl: './admin-qna.component.html',
  styleUrls: ['./admin-qna.component.css']
})
export class AdminQnaComponent implements OnInit {
  source: LocalDataSource;
  qnaList: Qna[];
  settings = {
  mode: 'external',
  actions: {
    delete: 'false',
    columnTitle:'Q&A'
  },
  add: {
    confirmCreate: 'true',
    addButtonContent: ''
  },
  edit: {
    saveButtonContent: '확인',
    editButtonContent: '답변',
    cancelButtonContent: '취소',
    confirmSave: 'true'
  },
  delete: {
    deleteButtonContent: '',
    confirmDelete: 'true'
  },
  columns: {
    q_no: {
      title: '질문번호'
    },
    q_title: {
      title: '제목'
    },
    u_id: {
      title: '작성자'
    },
    q_date: {
      title: '질문날짜'
    }
  }
};



  kinds = ["Bakery", "Sauce", "Drink", "Instant","Snack"];
  selectedKind = "All";

  navQna = new Qna;
  navState:string;
    constructor(
      private qnaService:QnaService,
      private sideNavService:SidenavService,
      private http:HttpClient
    ) {}


  editQna = new Qna;



  editDataBinding(event){
    this.editQna.q_no = event.data.q_no;
    this.editQna.q_title = event.data.q_title;
    this.editQna.q_content = event.data.q_content;
    this.editQna.u_id = event.data.u_id;
    this.editQna.q_reply = event.data.q_reply;
    this.editQna.q_date = event.data.q_date;
  }


  updateQna(event){
     this.navState = '1:1질문 답변하기';
     this.editDataBinding(event);
     this.navQna = this.editQna;
     this.sideNavService.openNav();
  }

  isReplyNull(qna:Qna){
    if(qna.q_reply==null){
      return true;
    }
    return false;
  }

  confirmEdit(){
    if(this.isReplyNull(this.navQna)){
        alert("답변 내용이 없습니다.");
    }else {
        this.http.put<Qna>('http://localhost:8080/toma/qna/reply', this.navQna).subscribe(
            res => {
              console.log(res);
              //event.confirm.resolve(event.newData);
              alert("답변이 달렸습니다.");
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
  }

  navQnaReset(){
     this.navQna = this.editQna;
  }


  ngOnInit() {
    this.qnaService.getAllQnaList()
    .subscribe((qnaList : Qna[]) => {
      this.qnaList = qnaList;
    })
  }

}
