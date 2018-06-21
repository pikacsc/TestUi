import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pairwise';
import { Router } from '@angular/router';
import { SidenavService } from '../shared/services/sidenav.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  constructor(
    private router: Router,
    private sideNavService: SidenavService
          ) {
         this.router.events.pairwise().subscribe((event) => {
             console.log(event);
             this.sideNavService.closeNav();
         });
     };

  ngOnInit() {
  }

}
