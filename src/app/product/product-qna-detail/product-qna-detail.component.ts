import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

import { ProductQnaService} from "../../shared/services/product-qna.service";
import { ProductQna} from "../../shared/models/ProductQna";
import { TokenService } from '../../shared/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-product-qna-detail',
  templateUrl: './product-qna-detail.component.html',
  styleUrls: ['./product-qna-detail.component.css']
})
export class ProductQnaDetailComponent implements OnInit {

  productQna : ProductQna ;
  u_id : string;

  constructor(

    private productQnaService : ProductQnaService,
    private authService: AuthService,
    private http : HttpClient,
    private router: Router,
    private tokenService : TokenService

  ) { }

  ngOnInit() {


    this.productQnaService.getProductQnaNoObject().subscribe((productQna: ProductQna)=>{
    this.tokenService.saveToken("productQnaToken", productQna);
    this.productQna = productQna;
    return this.productQna;
    })

    this.u_id = this.authService.getLoggedInUser().uid;
  }


  setProductQnaObject(){
    this.productQna = this.tokenService.getToken("productQnaToken");
    this.productQnaService.setProductQnaObject(this.productQna);
  }


  deleteProductQna(productQna : ProductQna){

    if(this.productQna.u_id == this.u_id){

      this.productQnaService.deleteProductQna(this.productQna)
      .subscribe(()=>{
        alert("고객님의 상품문의가 삭제되었습니다.");
        this.router.navigate(['/products/product', this.productQna.p_code]);

      })
    }else{
      alert("삭제할 권한이 없습니다.");
    }

  }



}
