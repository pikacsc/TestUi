import { Injectable } from '@angular/core';
import { Buffer } from "buffer";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  //tokenName : productlsit, user ,...
  getToken(tokenName: string) {
    const token = sessionStorage.getItem(tokenName);
    if (!token) {
      return null;
    }
    const strObj = new Buffer(token || "", "base64").toString("utf8");
    return JSON.parse(strObj);
  }

  //ex) orderToken,this.orderlist ...
  saveToken(tokenName: string, object: Object) {
    const objStr = JSON.stringify(object);
    const Token = new Buffer(objStr).toString("base64");
    localStorage.setItem(tokenName, Token);
    sessionStorage.setItem(tokenName, Token);
  }

  removeToken(tokenName: string) {
    if (this.isToken(tokenName)) {
      localStorage.removeItem(tokenName);
      sessionStorage.removeItem(tokenName);
      return 1;//토큰 삭제됨
    } else {
      return 0;//토큰이 애초에 존재하지 않음
    }
  }

  updateToken(tokenName: string, object: Object) {
    localStorage.removeItem(tokenName);
    sessionStorage.removeItem(tokenName);
    const objStr = JSON.stringify(object);
    const Token = new Buffer(objStr).toString("base64");
    localStorage.setItem(tokenName, Token);
    sessionStorage.setItem(tokenName, Token);
  }

  isToken(tokenName: string): Boolean {
    const token = sessionStorage.getItem(tokenName);
    if (token) {
      return true;
    }
    return false;
  }

}
