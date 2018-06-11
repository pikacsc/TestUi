import { Injectable } from "@angular/core";
import { HttpClientModule,HttpHeaders, HttpClient } from '@angular/common/http';
// import {
//   AngularFireDatabase,
//   AngularFireList,
//   AngularFireObject
// } from "angularfire2/database";

import * as moment from "moment";
import { User } from "../models/user";
import { Login } from "../models/login";


@Injectable()
export class UserService {
  selectedUser: User = new User();
  loginUser: User;

  location = {
    lat: null,
    lon: null
  };

  joinUrl='http://localhost:8080/toma/join/';
  loginUrl='http://localhost:8080/toma/login/';
  updateUrl='http://localhost:8080/toma/user/Update/'; // +user객체
  findUserIDUrl='http://localhost:8080/toma/user/findID/';
  findUserPWUrl='http://localhost:8080/toma/user/findPW/';
  constructor(private http: HttpClient) {
    // this.getUsers();
    this.loginUser=new User();
  }


  // getUsers(login: Login) {
  //   return this.http.post(this.url, login);
  //   // this.users = this.db.list("clients");
  //   // return this.users;
  // }

  getUsers(login: Login) {
    return this.http.post(this.loginUrl, login);
    // this.users = this.db.list("clients");
    // return this.users;
  }


  createUser(data: User) {
    // data.location = this.location;
    // data.createdOn = moment(new Date()).format("X");
    // this.users.push(data);

    return this.http.post(this.joinUrl,data);
  }

  updateUser(data:User){
    return this.http.put(this.updateUrl,data);
  }

  // updateUser(user: User) {
  //   // this.users.update(user.$key, user);
  // }


  findUserID(data : User){
    return this.http.post(this.findUserIDUrl,data);
  }

  findUserPW(data : User){
    return this.http.post(this.findUserPWUrl,data);
  }
  setLocation(lat, lon) {
    this.location.lat = lat;
    this.location.lon = lon;
  }
}
