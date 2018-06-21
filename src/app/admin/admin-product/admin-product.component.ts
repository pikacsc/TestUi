import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/models/product";
import { SidenavService } from "../../shared/services/sidenav.service";
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
    p_date: {
      title: '수정날짜'
    }
  }
};



  navProduct = new Product;
  navState:string;
    constructor(
      private sideNavService:SidenavService,
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
     this.sideNavService.openNav();
  }

  num:number;


  //숫자앞에 0붙여주는 메소드, ex) 0001, 0124
  pad(n, width) {
   n = n + '';
   return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
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

     codeMaker(p_kind:string){
           if(p_kind==='Bakery'){
             return 'B';
           }else if(p_kind==='Sauce'){
             return 'S';
           }else if(p_kind==='Drink'){
             return 'D';
           }else if(p_kind==='Instant'){
             return 'I';
           }else {
             return 'SN';
           }
     }
  confirmCreate(){
      let codefront = this.codeMaker(this.navProduct.p_kind);// 코드 앞자리 배정
      //(정규식) 숫자만 남기고 한글, 영문, 특수문자는 모두 제거한다.
      //상품코드에서 앞에 SN,I,S,D,B 를 제거
      var regex = /[^0-9]/gi;

      let lastProductIndex:number; //마지막 상품 번호
      let newProductIndex:number; //새 상품 번호
      this.productService.getProductByKind(this.navProduct.p_kind)//선택된 상품코드로 상품 리스트 가져오기
      .subscribe((productList:Product[]) => {
          //lastProductIndex: 해당 상품 종류의 마지막 상품 코드 번호
          lastProductIndex = parseInt(productList[productList.length-1].p_code.replace(regex,''));
          newProductIndex = this.pad(lastProductIndex+1,4);
          this.navProduct.p_code=codefront+newProductIndex; //새코드 부여
          this.navProduct.p_img=this.navProduct.p_code;
          this.finalCreateProduct(this.navProduct);
          this.sideNavService.closeNav();
          this.ngOnInit();
      });

  }

  finalCreateProduct(product:Product){
   this.http.post<Product>('http://localhost:8080/toma/product', product).subscribe(
           res => {
             console.log(res);
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

    allMsgChangeLogs: string[] = [];
    allEmployeeChangeLogs: string[] = [];


  ngOnChange(changes: SimpleChanges){
    for (let propName in changes) {
          let change = changes[propName];

          let curVal  = JSON.stringify(change.currentValue);
          let prevVal = JSON.stringify(change.previousValue);
          let changeLog = `${propName}: currentValue = ${curVal}, previousValue = ${prevVal}`;

          if (propName === 'message') {
             this.allMsgChangeLogs.push(changeLog);
             console.log(this.allMsgChangeLogs);
          } else if (propName === 'employee') {
             this.allEmployeeChangeLogs.push(changeLog);
              console.log(this.allMsgChangeLogs);
          }
      }
    if(this.navState==='상품 등록'){
      alert('hello');
      this.codeMaker(this.navProduct.p_kind);
      alert(this.navProduct.p_code);
    }
  }


  ngOnInit() {
    this.productService.getProducts()
    .subscribe((productList : Product[]) => {
      this.productList = productList;
    })
  }


}
