import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm, EmailValidator,FormBuilder } from "@angular/forms";
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Admin } from "../../shared/models/admin";
import { Login } from "../../shared/models/login";
import { TokenService } from "../../shared/services/token.service";
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminlogin = new Admin;


      constructor(
        private http: HttpClient,
        private tokenService:TokenService,
        private router: Router,
        private route: ActivatedRoute
      ) {}

      ngOnInit(){
      }


      login() {
        // this.admin.a_id =this.login1.uid;
        // this.admin.a_pw =this.login1.upw;
        this.http.post('http://localhost:8080/toma/admin/login',this.adminlogin)
        .subscribe((admin:Admin) => {
            if(admin==null){
              console.log("아이디 불일치");
              alert("아이디가 없습니다");
              // this.router.navigate(["index/login"]);
              // this.user = new User;
              return false;
            }
            this.adminlogin = admin;
            //서비스에 로그인된 객체를 저장
            //토큰부여(세션유지)
            this.tokenService.saveToken("adminToken",this.adminlogin);
            this.router.navigate(["admin"]);
          },(err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              alert("Client-side error occured.");
            } else {
              alert("Server-side error occured.");
            }
          });
        }
}
