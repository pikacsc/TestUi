import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/user.service"
declare var $: any;

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit {
  constructor(private userService:UserService) {
    console.log(userService.loginUser.uid);
    console.log(userService.loginUser.uname);
    console.log(userService.loginUser.uaddr1);
  }

  ngOnInit() {
    $(document).ready(function() {
      $(".banner").owlCarousel({
        autoHeight: true,
        center: true,
        nav: true,
        items: 1,
        margin: 30,
        loop: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      });
    });
  }
}
