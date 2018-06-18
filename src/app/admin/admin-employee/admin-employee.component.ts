import { Component, OnInit } from '@angular/core';
import { Admin } from '../../shared/models/admin';
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';
import { TokenService } from "../../shared/services/token.service";
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  template: `
    <ng2-smart-table
    [settings]="settings"
    [source]="adminList"
    (createConfirm)="createAmdin($event)"
    (deleteConfirm)="deleteAdmin($data)"
    (editConfirm)="updateAdmin($event)"
    (userRowSelect)="onUserRowSelect($event)"
    ></ng2-smart-table>
  `,
  styleUrls: ['./admin-employee.component.css']
})
export class AdminEmployeeComponent implements OnInit {


    constructor(
      private http: HttpClient,
      private tokenService: TokenService
    ) { }

    source: LocalDataSource;
    adminList: Admin[];
    settings = {
    mode: 'inline',
    add: {
      confirmCreate: 'true'
    },
    actions: {
      add: 'false',
      delete: 'false'
    },
    edit: {
      saveButtonContent: '확인',
      editButtonContent: '수정',
      cancelButtonContent: '취소',
      confirmSave: 'true'
    },
    delete: {
      deleteButtonContent: '삭제',
      confirmDelete: 'true'
    },
    columns: {
      a_id: {
        title: '직원아이디',
        editable: 'false'
      },
      a_name: {
        title: '이름',
        editable: 'false'
      },
      a_position: {
        title: '직책',
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
        title: '이메일',
        editable: 'false'
      },
      a_phone: {
        title: '연락처',
        editable: 'false'
      }
    }
  };


  newDataBinding(event){
    var data = {"a_id" : event.newData.a_id,
                 "a_name" : event.newData.a_name,
                 "a_position" : event.newData.a_position,
                 "a_job" : event.newData.a_job,
                 "a_email" : event.newData.a_email,
                 "a_phone" : event.newData.a_phone,
                 };
                 return data;
  }

  editDataBinding(event){
    var data = {"a_id" : event.data.a_id,
                 "a_name" : event.data.a_name,
                 "a_position" : event.data.a_position,
                 "a_job" : event.data.a_job,
                 "a_email" : event.data.a_email,
                 "a_phone" : event.data.a_phone,
                 };
                 return data;
  }




  createAmdin(event){
    //$('#myModal').modal('show')

       this.http.post<Admin>('http://localhost:8080/toma/admin/', this.newDataBinding(event)).subscribe(
               res => {
                 console.log(res);
                 event.confirm.resolve(event.newData);
                 alert("직원이 등록되었습니다.");
                 this.tokenService.removeToken("adminListToken");
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("Client-side error occured.");
        } else {
          alert("Server-side error occured.");
        }
      });
   }

  updateAdmin(event){
    alert(document.getElementById('inputPassword'));
    this.http.put<Admin>('http://localhost:8080/toma/admin/', this.newDataBinding(event)).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
          alert("직원 정보가 수정되었습니다.");
          this.tokenService.removeToken("adminListToken");
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
            this.tokenService.removeToken("adminListToken");
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
          this.tokenService.saveToken("adminListToken",this.adminList);
        },(err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            alert("Client-side error occured.");
          } else {
            alert("Server-side error occured.");
          }
        });
    }




    ngOnInit() {
        if(this.tokenService.isToken("adminListToken")){
          this.adminList = this.tokenService.getToken("adminListToken");
        }else{
          this.getAdminList();
          this.tokenService.saveToken("adminListToken",this.adminList);
        }
    }

}
