import { Component, OnInit } from '@angular/core';
import { Review } from '../../../shared/models/review';
import { ReviewService } from '../../../shared/services/review.service';
import { ProductService } from "../../../shared/services/product.service";
import { Product } from "../../../shared/models/product";
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-product-review',
  templateUrl: './admin-product-review.component.html',
  styleUrls: ['./admin-product-review.component.css']
})
export class AdminProductReviewComponent implements OnInit {
  source: LocalDataSource;
  reviewList: Review[];
  settings = {
  mode: 'external',
  actions: {
    delete: 'false',
    columnTitle:'Review'
  },
  add: {
    confirmCreate: 'true',
    addButtonContent: ''
  },
  edit: {
    editButtonContent: '조회',
    confirmSave: 'true'
  },
  delete: {
    deleteButtonContent: '',
    confirmDelete: 'true'
  },
  columns: {
    rev_no: {
      title: '번호'
    },
    rev_title: {
      title: '제목'
    },
    u_id: {
      title: '작성자'
    },
    rev_hits: {
      title: '조회수'
    },
    rev_date: {
      title: '후기날짜'
    }
  }
};



  kinds = ["Bakery", "Sauce", "Drink", "Instant","Snack"];
  selectedKind = "All";


  reviewProduct = new Product;
  navReview = new Review;
  navState:string;
    constructor(
      private productService:ProductService,
      private reviewService:ReviewService,
      private http:HttpClient
    ) {}


  editReview = new Review;



  reviewRead(event){
    this.navReview = event.data;
    this.productService.getProductById(event.data.p_code).subscribe((reviewProduct:Product)=>{
        this.reviewProduct = reviewProduct;
    });

    this.openNav();
  }



    openNav() {
        document.getElementById("mySidenav").style.width = "650px";
        document.body.style.marginLeft = "650px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.body.style.marginLeft = "0";
    }


  ngOnInit() {
    this.http.get<Review[]>('http://localhost:8080/toma/review/')
    .subscribe((reviewList : Review[]) => {
      this.reviewList = reviewList;
    })
  }
}
