import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/models/product";
import { SidenavService } from "../../shared/services/sidenav.service";
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';

declare var $: any;


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  source: LocalDataSource;
  productList: Product[];
  settings = {
  mode: 'external',
  actions: {
    delete: 'false',
    columnTitle:'상품관리'
  },
  add: {
    confirmCreate: 'true',
    addButtonContent: '상품추가'
  },
  edit: {
    saveButtonContent: '확인',
    editButtonContent: '수정',
    cancelButtonContent: '취소',
    confirmSave: 'true'
  },
  delete: {
    deleteButtonContent: '',
    confirmDelete: 'true'
  },
  columns: {
    p_code: {
      title: '상품코드'
    },
    p_name: {
      title: '상품명'
    },
    p_count: {
      title: '재고'
    },
    p_kind: {
      title: '분류',
      editor: {
        type: 'list',
        config: {
          list: [
            { value: 'Bakery', title: 'Bakery' },
            { value: 'Sauce', title: 'Sauce' },
            { value: 'Drink', title: 'Drink' },
            { value: 'Instant', title: 'Instant' },
            { value: 'Snack', title: 'Snack' }
          ] },
      }
    },
    p_price: {
      title: '원가'
    },
    p_sellPrice: {
      title: '판매가'
    },
    p_profit: {
      title: '순이익'
    },
    p_img: {
      title: '이미지'
    },
    p_date: {
      title: '수정날짜'
    }
  }
};



  navState:string;
    constructor(
      private sideNavService:SidenavService,
      private productService:ProductService,
      private http:HttpClient
    ) {}


  navProduct = new Product;
  editProduct = new Product;
  newProduct = new Product;
  autoCodeGeneratorOn :boolean;



  editDataBinding(event){
    this.editProduct.p_code = event.data.p_code;
    this.editProduct.p_name = event.data.p_name;
    this.editProduct.p_count = event.data.p_count;
    this.editProduct.p_kind = event.data.p_kind;
    this.editProduct.p_price = event.data.p_price;
    this.editProduct.p_sellPrice = event.data.p_sellPrice;
    this.editProduct.p_profit = event.data.p_profit;
    this.editProduct.p_img = event.data.p_img;
    this.editProduct.p_content = event.data.p_content;
    this.editProduct.p_date = event.data.p_date;
  }


  updateProduct(event){
     this.navState = '상품 정보 수정';
     this.editDataBinding(event);
     this.navProduct = this.editProduct;
     this.sideNavService.openNav();
  }


  confirmEdit(){
    this.http.put<Product>('http://localhost:8080/toma/product/'+this.navProduct.p_code, this.navProduct).subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
          alert("상품이 수정되었습니다.");
          this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("Client-side error occured.");
        } else {
          alert("Server-side error occured.");
        }
      });
  }

    insertProduct(event){
        this.navState = '상품 등록';
        this.navProduct = new Product;
        this.sideNavService.openNav();
     }


  isProductValueNull(product:Product){
    if(product.p_name==null){
      $("#p_name").focus();
      alert("상품명을 입력하세요");
      return true;
    }else if(product.p_kind==null){
      $("#p_kind").focus();
      alert("상품종류를 선택하세요");
      return true;
    }else if(product.p_price==null){
      $("#p_price").focus();
      alert("원가를 입력하세요");
      return true;
    }else if(product.p_sellPrice==null){
      $("#p_sellPrice").focus();
      alert("판매가를 입력하세요");
      return true;
    }else if(product.p_count==null){
      $("#p_count").focus();
      alert("재고를 입력하세요");
      return true;
    }else if(product.p_content==null){
      $("#p_content").focus();
      alert("상품내용을 입력하세요");
      return true;
    }else{
      return false;
    }
  }


  confirmCreate(){
    if(this.isProductValueNull(this.navProduct)){
      return false;
    }else{
       this.http.post<Product>('http://localhost:8080/toma/product', this.navProduct).subscribe(
               res => {
                 console.log(res);
                 alert("상품이 등록되었습니다.");
                this.navProduct = new Product;
                this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("Client-side error occured.");
        } else {
          alert("Server-side error occured.");
        }
      });
    }

  }

  navProductReset(){
     this.navProduct = this.editProduct;
  }



  onSearchChange(searchValue : number ) {
      this.navProduct.p_profit = this.navProduct.p_sellPrice - this.navProduct.p_price;
  }


  ngOnInit() {
    this.productService.getProducts()
    .subscribe((productList : Product[]) => {
      this.productList = productList;
    })
  }


}
