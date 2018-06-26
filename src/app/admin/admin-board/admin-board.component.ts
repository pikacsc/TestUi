import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../shared/services/sidenav.service'
@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {

  currentBoard: number;

  selectchange(args){
    this.currentBoard = args.target.value;
    this.sideNavService.bodyMarginReset();
  }

  constructor(private sideNavService:SidenavService) {}

  ngOnInit() {
  }

}
