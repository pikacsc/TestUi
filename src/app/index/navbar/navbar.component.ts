import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
import { TokenService } from "../../shared/services/token.service";
declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  select = 'Home';
  numb:number;
  constructor(
    public authService: AuthService,
    private router: Router,
    public productService: ProductService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.numb = 0;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
    location.reload();
  }

  adminlogout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(["/"]);
    location.reload();
  }

  countUp(){
    this.numb+=1;
  }

}
