import { Component, OnInit } from "@angular/core";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user";
import { AuthService } from "../../shared/services/auth.service";

import { UserService } from "../../shared/services/user.service";


@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.scss"]
})
export class UserAccountComponent implements OnInit {
  loggedUser: User;
  // Enable Update Button
  // enbUpdBut: Boolean = true;


  constructor(private authService:AuthService,private fb: FormBuilder, private userService: UserService,  private router: Router ) {

  }

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedInUser(); //로그인된 유저 가져오고
  }

  updateProfile(updatePerson: NgForm) {

    this.userService.updateUser(this.loggedUser).subscribe(()=>{
      // this.loggedUser = data;
      this.authService.updateUserToken(this.loggedUser);
      alert("수정되었습니다");
      this.router.navigate(["index"]);
    });
  }
  daumAddressOptions =  {
    class: ['btn', 'btn-sm', 'btn-primary']
  };
  AddrSearch1_2:string; //우편번호(zip)+기본주소(addr)
  AddrSearch1_3:string=""; //상세주소
  setDaumAddressApi(AddrSearch){
  // 여기로 주소값이 반환
    this.AddrSearch1_2 = AddrSearch.zip+" / "+AddrSearch.addr;
    this.loggedUser.uaddr1 = this.AddrSearch1_2;
  }
  AddrSearch2_2:string;
  AddrSearch2_3:string="";
  setDaumAddressApi2(AddrSearch2){
  // 여기로 주소값이 반환
    this.AddrSearch2_2 = AddrSearch2.zip+" / "+AddrSearch2.addr;
    this.loggedUser.uaddr2 = this.AddrSearch2_2;
  }
  AddrSearch3_2:string;
  AddrSearch3_3:string="";
  setDaumAddressApi3(AddrSearch3){
  // 여기로 주소값이 반환
    this.AddrSearch3_2 = AddrSearch3.zip+" / "+AddrSearch3.addr;
    this.loggedUser.uaddr3 = this.AddrSearch3_2;
  }
}
