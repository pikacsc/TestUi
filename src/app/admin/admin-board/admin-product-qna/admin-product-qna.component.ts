import { Component, OnInit } from '@angular/core';
import { ProductQna } from '../../../shared/models/productQna';
import { ProductQnaService } from '../../../shared/services/product-qna.service';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-product-qna',
  templateUrl: './admin-product-qna.component.html',
  styleUrls: ['./admin-product-qna.component.css']
})
export class AdminProductQnaComponent implements OnInit {
  source: LocalDataSource;
  productQnaList: ProductQna[];
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
    pq_no: {
      title: '질문번호'
    },
    pq_category: {
      title: '카테고리'
    },
    pq_title: {
      title: '제목'
    },
    u_id: {
      title: '작성자'
    },
    pq_replyyn: {
      title: '답변여부'
    },
    pq_date: {
      title: '질문날짜'
    }
  }
};



  kinds = ["Bakery", "Sauce", "Drink", "Instant","Snack"];
  selectedKind = "All";

  navProductQna = new ProductQna;
  navState:string;
    constructor(
      private productQnaService:ProductQnaService,
      private http:HttpClient
    ) {}


  editProductQna = new ProductQna;



  editDataBinding(event){
    this.editProductQna.pq_no = event.data.pq_no;
    this.editProductQna.pq_category = event.data.pq_category;
    this.editProductQna.pq_title = event.data.pq_title;
    this.editProductQna.pq_content = event.data.pq_content;
    this.editProductQna.u_id = event.data.u_id;
    this.editProductQna.pq_reply = event.data.pq_reply;
    this.editProductQna.pq_hits = event.data.pq_hits;
    this.editProductQna.p_code = event.data.p_code;
    this.editProductQna.pq_replyyn = event.data.pq_replyyn;
    this.editProductQna.pq_date = event.data.pq_date;
  }


  updateProductQna(event){
     this.navState = '상품 질문 답변하기';
     this.editDataBinding(event);
     this.navProductQna = this.editProductQna;
     this.openNav();
  }

  isReplyNull(productQna:ProductQna){
    if(productQna.pq_reply==null){
      return true;
    }
    return false;
  }

  confirmEdit(){
    if(this.isReplyNull(this.navProductQna)){
        alert("답변 내용이 없습니다.");
    }else {
        this.navProductQna.pq_replyyn = 'y'
        this.http.put<ProductQna>('http://localhost:8080/toma/productqna/reply',this.navProductQna).subscribe(
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


    openNav() {
        document.getElementById("mySidenav").style.width = "650px";
        document.body.style.marginLeft = "650px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.body.style.marginLeft = "0";
    }

  navProductQnaReset(){
     this.navProductQna = this.editProductQna;
  }


  ngOnInit() {
    this.http.get<ProductQna[]>('http://localhost:8080/toma/productqna/')
    .subscribe((productQnaList : ProductQna[]) => {
      this.productQnaList = productQnaList;
    })
  }

}
