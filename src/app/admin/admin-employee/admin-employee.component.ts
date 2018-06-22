import { Component, OnInit } from '@angular/core';
import { Admin } from '../../shared/models/admin';
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';
import { SidenavService } from "../../shared/services/sidenav.service";
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.css']
})
export class AdminEmployeeComponent implements OnInit {


    constructor(
      private http: HttpClient,
      private sideNavService: SidenavService
    ) { }

    source: LocalDataSource;
    adminList: Admin[];
    settings = {
    mode: 'inline',
    actions: {
      delete: 'false',
      columnTitle:'직원관리'
    },
    add: {
      confirmCreate: 'true',
      addButtonContent: '등록'
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
      a_id: {
        title: '직원아이디'
      },
      a_name: {
        title: '이름'
      },
      a_position: {
        title: '직위',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: '사장', title: '사장' },
              { value: '전무이사', title: '전무이사' },
              { value: '사원', title: '사원' },
              { value: '대리', title: '대리' },
              { value: '차장', title: '차장' },
              { value: '부장', title: '부장' },
              { value: '대표', title: '대표' }
            ] },
        }
      },
      a_job: {
        title: '직무',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: '전무이사', title: '전무이사' },
              { value: '경리', title: '경리' },
              { value: '디자인', title: '디자인' },
              { value: '개발', title: '개발' },
              { value: '영업', title: '영업' }
            ]
          },
        }
      },
      a_email:{
        title: '이메일'
      },
      a_phone: {
        title: '연락처'
      }
    }
  };


  navAdmin = new Admin;
  navState:string;
  apw2:string;

  newDataBinding(event){
    this.navAdmin.a_id = event.newData.a_id;
    this.navAdmin.a_name = event.newData.a_name;
    this.navAdmin.a_position = event.newData.a_position;
    this.navAdmin.a_job = event.newData.a_job,
    this.navAdmin.a_email =  event.newData.a_email,
    this.navAdmin.a_phone = event.newData.a_phone
  }

  editDataBinding(event){
    var data = {"a_id" : event.data.a_id,
                 "a_pw" : event.data.a_pw,
                 "a_name" : event.data.a_name,
                 "a_position" : event.data.a_position,
                 "a_job" : event.data.a_job,
                 "a_email" : event.data.a_email,
                 "a_phone" : event.data.a_phone,
                 };
                 return data;
  }

  isAdminValueNull(event){
    if(event.newData.a_name==null){
      alert("이름을 입력하세요");
      return true;
    }else if(event.newData.a_job==null){
      alert("직무를 선택하세요");
      return true;
    }else if(event.newData.a_phone==null){
      alert("연락처를 입력하세요");
      return true;
    }else if(event.newData.a_email==null){
      alert("이메일을 입력하세요");
      return true;
    }else if(event.newData.a_position==null){
      alert("직위를 입력하세요");
      return true;
    }else if(event.newData.a_id==null){
      alert("아이디를 입력하세요");
      return true;
    }else{
      return false;
    }
  }


  createAdmin(event){
    this.navState = '직원 등록';
    this.navAdmin = new Admin;
    this.newDataBinding(event);
    if(this.isAdminValueNull(event)){
      return false;
    }else{
      this.openNav();
    }
  }

  confirmCreate(){
      if(this.navAdmin.a_pw!==this.apw2){
        alert("비밀번호 확인이 불일치 합니다");
      }else {
       this.http.post<Admin>('http://localhost:8080/toma/admin/', this.navAdmin).subscribe(
               res => {
                 console.log(res);
                 alert("직원이 등록되었습니다.");
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
      }
   }

  updateAdmin(event){
    this.http.put<Admin>('http://localhost:8080/toma/admin/', this.editDataBinding(event)).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
          alert("직원 정보가 수정되었습니다.");
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("Client-side error occured.");
        } else {
          alert("Server-side error occured.");
        }
      });
  }


    deleteProduct(event){
       this.http.delete<any>('http://localhost:8080/toma/admin/'+event.data.a_id).subscribe(
           res => {
             console.log(res);
             event.confirm.resolve(event.source.data);
            alert("직원 정보가 삭제되었습니다.");
         },
         (err: HttpErrorResponse) => {
           if (err.error instanceof Error) {
             alert("Client-side error occured.");
           } else {
             alert("Server-side error occured.");
           }
         });
       //event.confirm.resolve(event.source.data);
    }


    getAdminList(){
        this.http.get<Admin[]>('http://localhost:8080/toma/admin/')
        .subscribe((adminList: Admin[]) => {
          this.adminList = adminList;
        },(err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            alert("Client-side error occured.");
          } else {
            alert("Server-side error occured.");
          }
        });
    }


        openNav() {
            document.getElementById("mySidenav").style.width = "650px";
            document.body.style.marginLeft = "650px";
        }

        closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.body.style.marginLeft = "0";
        }


    ngOnInit() {
      this.getAdminList();
    }

}
