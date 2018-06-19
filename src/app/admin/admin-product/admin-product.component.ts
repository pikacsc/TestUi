import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/models/product";
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';
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
    p_content: {
      title: '상품내용'
    },
    p_date: {
      title: '수정날짜'
    }
  }
};



selectedFile: File;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    this.http.post('http://localhost:8080/uploadFile', this.selectedFile, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });
  }


  kinds = ["Bakery", "Sauce", "Drink", "Instant","Snack"];
  selectedKind = "All";

  navProduct = new Product;
  navState:string;
    constructor(
      private productService:ProductService,
      private http:HttpClient
    ) {}


  editProduct = new Product;

  newProduct = new Product;
  modifiedProduct:Product;


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
     this.openNav();
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
        this.openNav();
     }

  confirmCreate(){
    this.http.post<Product>('http://localhost:8080/toma/product', this.navProduct).subscribe(
            res => {
              console.log(res);
              //event.confirm.resolve(event.newData);
              alert("상품이 등록되었습니다.");
   },
   (err: HttpErrorResponse) => {
     if (err.error instanceof Error) {
       alert("Client-side error occured.");
     } else {
       alert("Server-side error occured.");
     }
   });
  }




    deleteProduct(event){
       this.http.delete<any>('http://localhost:8080/toma/detail/product/'+event.data.p_code).subscribe(
           res => {
             console.log(res);
             event.confirm.resolve(event.source.data);
            alert("상품이 삭제되었습니다.");
         },
         (err: HttpErrorResponse) => {
           if (err.error instanceof Error) {
             alert("Client-side error occured.");
           } else {
             alert("Server-side error occured.");
           }
         });
       //event.confirm.resolve(event.source.data);
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "650px";
        document.body.style.marginLeft = "650px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.body.style.marginLeft = "0";
    }

  productNullCheck(){
    if(this.navProduct == null){
      return true;
    }else {
      return false;
    }
  }
  navProductReset(){
     this.navProduct = this.editProduct;
  }


  p_countUp() {
    ++this.navProduct.p_count;
  }

  p_countDown() {
    if (this.navProduct.p_count > 1)
      --this.navProduct.p_count;
    else
      alert('더 이상 줄일 수 없습니다.');
  }





  ngOnInit() {
    this.productService.getProducts()
    .subscribe((productList : Product[]) => {
      this.productList = productList;
    })
  }



}
