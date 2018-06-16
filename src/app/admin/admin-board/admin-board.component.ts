import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {

  currentBoard: number;

  selectchange(args){
    this.currentBoard = args.target.value;
  }

  constructor() {}

  ngOnInit() {
  }

}
