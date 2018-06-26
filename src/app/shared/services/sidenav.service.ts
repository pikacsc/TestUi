import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  openNav() {
      document.getElementById("mySidenav").style.width = "650px";
      document.body.style.marginLeft = "650px";
  }

  closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.body.style.marginLeft = "0";
  }

  bodyMarginReset(){ //수정 네비창 닫고 화면 맞추기
      var sideNav = document.getElementById("mySidenav");
      if(sideNav!=null){
          sideNav.style.width = "0";
          document.body.style.marginLeft = "0";
      }
      document.body.style.marginLeft = "0";
  }


  constructor() { }
}
