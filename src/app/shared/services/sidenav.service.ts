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


  constructor() { }
}
