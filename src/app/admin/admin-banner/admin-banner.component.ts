import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin-banner',
  templateUrl: './admin-banner.component.html',
  styleUrls: ['./admin-banner.component.css']
})
export class AdminBannerComponent implements OnInit {


  constructor(
  ) { }

  ngOnInit() {

  }


   uploadedFiles: any[] = [];

   onUpload(event) {
       for(let file of event.files) {
           this.uploadedFiles.push(file);
       }
   }

}
