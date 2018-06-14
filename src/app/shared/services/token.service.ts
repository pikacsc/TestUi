import { Injectable } from '@angular/core';
import { Buffer } from "buffer";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(tokenName:string){
    const token = sessionStorage.getItem(tokenName);
    if (!token) {
      return null;
    }
    const strObj = new Buffer(token || "", "base64").toString("utf8");
    return JSON.parse(strObj);
  }

    saveToken(tokenName:string,object:Object){
      const objStr = JSON.stringify(object);
      const Token = new Buffer(objStr).toString("base64");
      localStorage.setItem(tokenName, Token);
      sessionStorage.setItem(tokenName, Token);
    }

    updateToken(tokenName:string,object:Object){
      localStorage.removeItem(tokenName);
      sessionStorage.removeItem(tokenName);
      const objStr = JSON.stringify(object);
      const Token = new Buffer(objStr).toString("base64");
      localStorage.setItem(tokenName, Token);
      sessionStorage.setItem(tokenName, Token);
    }

    removeToken(tokenName:string){
      localStorage.removeItem(tokenName);
      sessionStorage.removeItem(tokenName);
    }

    isToken(tokenName:string): Boolean {
      const token = sessionStorage.getItem(tokenName);
      if (token) {
        return true;
      }
      return false;
    }


}
