import { Component, OnInit } from '@angular/core';
import { Qna } from '../../../shared/models/qna';
import { QnaService } from '../../../shared/services/qna.service';

@Component({
  selector: 'app-admin-qna',
  templateUrl: './admin-qna.component.html',
  styleUrls: ['./admin-qna.component.css']
})
export class AdminQnaComponent implements OnInit {
      displayDialog: boolean;
      qna: Qna;
  //    car: Car = {};

      selectedQna: Qna;
//      selectedCar: Car;

      newQna: boolean;

      qnaList: Qna[];
//      cars: Car[];


      cols: any[];

      constructor(private qnaService: QnaService) { }

      ngOnInit() {
          this.qnaService.getAllQnaList().
          subscribe((qnaList:Qna[]) => {
            this.qnaList = qnaList;

          });

          this.cols = [
              { field: 'vin', header: 'Vin' },
              { field: 'year', header: 'Year' },
              { field: 'brand', header: 'Brand' },
              { field: 'color', header: 'Color' }
          ];
      }

      showDialogToAdd() {
          this.newQna = true;
          this.displayDialog = true;
      }

      save() {
          let qnaList = [...this.qnaList];
          if (this.newQna)
              qnaList.push(this.qna);
          else
              qnaList[this.qnaList.indexOf(this.selectedQna)] = this.qna;

          this.qnaList = qnaList;
          this.qna = null;
          this.displayDialog = false;
      }

      delete() {
          let index = this.qnaList.indexOf(this.selectedQna);
          this.qnaList = this.qnaList.filter((val, i) => i != index);
          this.qna = null;
          this.displayDialog = false;
      }

      onRowSelect(event) {
          this.newQna = false;
          this.qna = this.cloneQna(event.data);
          this.displayDialog = true;
      }

      cloneQna(q: Qna): Qna {
          let qna;
          for (let prop in q) {
              qna[prop] = q[prop];
          }
          return qna;
      }
}
