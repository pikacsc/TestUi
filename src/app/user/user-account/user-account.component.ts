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

  updateProfile(form: NgForm) {

    this.userService.updateUser(this.loggedUser).subscribe(()=>{
      // this.loggedUser = data;
      this.authService.updateUserToken(this.loggedUser);
      alert("수정되었습니다");
      this.router.navigate(["index"]);
    });
  }
}
