// import { Injectable } from "@angular/core";
// import { Http } from '@angular/http';
// import { Observable } from "rxjs";
// // import * as firebase from "firebase/app";
// import { log } from "util";
// import { Buffer } from "buffer";
// import { User } from "../models/user";
// import { UserService } from "./user.service";
// import { CachcingServiceBase } from "./cachcing.service";
// import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map'
//
// @Injectable()
// export class AuthService extends CachcingServiceBase {
//   // user: Observable<firebase.User>;
//   private users: Observable<User[]>;
//   usersList: User[] = [];
//
//   constructor(
//     private userService: UserService,
//     private http: HttpClient
//   ) {
//     super();
//     this.getAllUsers();
//   }
//
//   login(id: string, password: string): Observable<User[]> {
//     console.log("id", id);
//     console.log("password", password);
//
//     let status = false;
//     for (const el of this.usersList) {
//       console.log(el);
//       if (id === el.userId && password === el.userPassword) {
//         const loggedInUser = el;
//         const objStr = JSON.stringify(loggedInUser);
//         const token = new Buffer(objStr).toString("base64");
//         localStorage.setItem("token", token);
//         sessionStorage.setItem("token", token);
//         status = true;
//         break;
//       }
//     }
//
//     return this.http.get<User[]>("http://localhost:8080/toma/login/");
//   }
//
//   loginCheck(id: string, password: string): boolean {
//     console.log("id", id);
//     console.log("password", password);
//
//     let status = false;
//     for (const el of this.usersList) {
//       console.log(el);
//       if (id === el.userId && password === el.userPassword) {
//         const loggedInUser = el;
//         const objStr = JSON.stringify(loggedInUser);
//         const token = new Buffer(objStr).toString("base64");
//         localStorage.setItem("token", token);
//         sessionStorage.setItem("token", token);
//         status = true;
//         break;
//       }
//     }
//
//     return status;
//   }
//
//   logout() {
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("token");
//   }
//
//   isLoggedIn(): Boolean {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       return true;
//     }
//     return false;
//   }
//
//   isAdmin(): boolean {
//     const token = sessionStorage.getItem("token");
//
//     if (!token) {
//       return false;
//     }
//
//     const strObj = new Buffer(token || "", "base64").toString("utf8");
//     const loggedUser = JSON.parse(strObj);
//     if (loggedUser["isAdmin"] === true) {
//       return true;
//     }
//     return false;
//   }
//
//   getLoggedInUser(): User {
//     const token = sessionStorage.getItem("token");
//
//     if (!token) {
//       return null;
//     }
//
//     const strObj = new Buffer(token || "", "base64").toString("utf8");
//     const loggedUser: User = JSON.parse(strObj);
//     return loggedUser;
//   }
//
//   getAllUsers() {
//     const x = this.userService.getUsers();
//     x.snapshotChanges().subscribe(user => {
//       this.usersList = [];
//       user.forEach(element => {
//         const y = element.payload.toJSON();
//         y["$key"] = element.key;
//         this.usersList.push(y as User);
//       });
//     });
//   }
// }
