import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
// import * as firebase from "firebase/app";
import { log } from "util";
import { Buffer } from "buffer";
import { User } from "../models/user";
import { UserService } from "./user.service";
import { HttpClient } from '@angular/common/http';
import { TokenService } from "./token.service";
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  // user: Observable<firebase.User>;
  private users: Observable<User[]>;
  usersList: User[] = [];

  constructor(
    private userService: UserService,
    private tokenService:TokenService
  ) {}

  saveUserToken(){
    const objStr = JSON.stringify(this.userService.loginUser);
    const token = new Buffer(objStr).toString("base64");
    localStorage.setItem("loginToken", token);
    sessionStorage.setItem("loginToken", token);
  }

  updateUserToken(user:User){
    localStorage.removeItem("loginToken");
    sessionStorage.removeItem("loginToken");
    const objStr = JSON.stringify(user);
    const token = new Buffer(objStr).toString("base64");
    localStorage.setItem("loginToken", token);
    sessionStorage.setItem("loginToken", token);
  }


  loginCheck(id: string, password: string): boolean {
    console.log("id", id);
    console.log("password", password);

    let status = false;
    for (const el of this.usersList) {
      console.log(el);
      if (id === el.uid && password === el.upw) {
        const loggedInUser = el;
        const objStr = JSON.stringify(loggedInUser);
        const token = new Buffer(objStr).toString("base64");
        localStorage.setItem("loginToken", token);
        sessionStorage.setItem("loginToken", token);
        status = true;
        break;
      }
    }

    return status;
  }

  logout() {
    //localStorage.removeItem("loginToken");
    //sessionStorage.removeItem("loginToken");
    localStorage.clear();
    sessionStorage.clear();
  }

  isLoggedIn(): Boolean {
    const token = sessionStorage.getItem("loginToken");
    if (token) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    const token = sessionStorage.getItem("adminToken");

    if (token) {
      return true;
    }
    return false;
  }

  getLoggedInUser(): User {
    const token = sessionStorage.getItem("loginToken");

    if (!token) {
      return null;
    }

    const strObj = new Buffer(token || "", "base64").toString("utf8");
    const loggedUser: User = JSON.parse(strObj);
    return loggedUser;
  }
}
