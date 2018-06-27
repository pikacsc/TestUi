import { Injectable } from "@angular/core";
import { HttpClientModule,HttpHeaders, HttpClient } from '@angular/common/http';
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
  updateUrl='http://localhost:8080/toma/user/Update/';
  findUserIDUrl='http://localhost:8080/toma/user/findID/';
  findUserPWUrl='http://localhost:8080/toma/user/findPW/';
  constructor(private http: HttpClient) {
    this.loginUser=new User();
  }
  // 로그인
  getUsers(login: Login) {
    return this.http.post(this.loginUrl, login);
  }

  // 회원가입
  createUser(data: User) {
    return this.http.post(this.joinUrl,data);
  }
  // 회원정보수정
  updateUser(data:User){
    return this.http.put(this.updateUrl,data);
  }
  // 아이디찾기
  findUserID(data : User){
    return this.http.post(this.findUserIDUrl,data);
  }
  // 비밀번호찾기
  findUserPW(data : User){
    return this.http.post(this.findUserPWUrl,data);
  }
  setLocation(lat, lon) {
    this.location.lat = lat;
    this.location.lon = lon;
  }
}
