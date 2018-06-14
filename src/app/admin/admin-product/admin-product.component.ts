import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/models/product";
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  template: `
    <ng2-smart-table
    [settings]="settings"
    [source]="productList"
    (edit)="log($data)"
    (createConfirm)="insertProduct($event)"
    (deleteConfirm)="deleteProduct($data)"
    (editConfirm)="updateProduct($event)"
    (userRowSelect)="onUserRowSelect($event)"
    ></ng2-smart-table>
  `,
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {


    constructor(
      private productService:ProductService,
      private http:HttpClient
    ) {}

    source: LocalDataSource;
  productList: Product[];
  settings = {
    mode: 'inline',
    add: {
      confirmCreate: 'true'
    },
    edit: {
      saveButtonContent: '확인',
      editButtonContent: '수정',
      cancelButtonContent: '취소',
      confirmSave: 'true'
    },
    delete: {
      deleteButtonContent: '삭제',
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

  newProduct:Product;
  modifiedProduct:Product;
  onUserRowSelect(event): void {
      console.log(event);
  }


  newDataBinding(event){
    var data = {"p_code" : event.newData.p_code,
                 "p_name" : event.newData.p_name,
                 "p_count" : event.newData.p_count,
                 "p_kind" : event.newData.p_kind,
                 "p_price" : event.newData.p_price,
                 "p_sellPrice" : event.newData.p_sellPrice,
                 "p_profit" : event.newData.p_profit,
                 "p_img" : event.newData.p_img,
                 "p_content" : event.newData.p_content,
                 "p_date" : event.newData.p_date
                 };
                 return data;
  }

  editDataBinding(event){
    var data = {"p_code" : event.data.p_code,
                 "p_name" : event.data.p_name,
                 "p_count" : event.data.p_count,
                 "p_kind" : event.data.p_kind,
                 "p_price" : event.data.p_price,
                 "p_sellPrice" : event.data.p_sellPrice,
                 "p_profit" : event.data.p_profit,
                 "p_img" : event.data.p_img,
                 "p_content" : event.data.p_content,
                 "p_date" : event.data.p_date
                 };
                 return data;
  }


  insertProduct(event){
       this.http.post<Product>('http://localhost:8080/toma/product', this.newDataBinding(event)).subscribe(
               res => {
                 console.log(res);
                 event.confirm.resolve(event.newData);
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

  updateProduct(event){
    this.http.put<Product>('http://localhost:8080/toma/product/'+event.newData.p_code, this.newDataBinding(event)).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
          alert("상품이 수정되었습니다.");
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

  ngOnInit() {
    this.productService.getProducts()
    .subscribe((productList : Product[]) => {
      this.productList = productList;
    })
  }



}
