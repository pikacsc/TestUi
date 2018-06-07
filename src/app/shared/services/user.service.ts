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

  loginUrl='http://localhost:8080/toma/login/';

  constructor(private http: HttpClient) {
    // this.getUsers();
    this.loginUser=new User();
  }

  getUsers(login: Login) {
    return this.http.post(this.loginUrl, login);
    // this.users = this.db.list("clients");
    // return this.users;
  }

  createUser(data: User) {
    // data.location = this.location;
    // data.createdOn = moment(new Date()).format("X");
    // this.users.push(data);
  }

  updateUser(user: User) {
    // this.users.update(user.$key, user);
  }

  setLocation(lat, lon) {
    this.location.lat = lat;
    this.location.lon = lon;
  }
}
