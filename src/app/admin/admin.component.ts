import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pairwise';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
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
            router.events.subscribe( (event: Event) => { //routing 변화 감지

                  if (event instanceof NavigationStart) {
                      this.sideNavService.bodyMarginReset(); //수정 nav 닫아주고 margin 초기화
                  }

                  if (event instanceof NavigationEnd) {
                      this.sideNavService.bodyMarginReset();
                  }

                  if (event instanceof NavigationError) {
                      this.sideNavService.bodyMarginReset();
                  }
              });
     };

  ngOnInit() {
  }

}
