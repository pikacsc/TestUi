import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import 'rxjs/add/operator/map';
import { TableModule } from 'primeng/table';
import { AppComponent } from "./app.component";
import { IndexModule } from "./index/index.module";
import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";
import { SharedModule } from "./shared/shared.module";
import { NoticeModule } from "./notice/notice.module"
import { AdminModule } from "./admin/admin.module";
import { AppRoutes } from "./app.routing";
import {NgxPaginationModule} from 'ngx-pagination';
//동현임포트수정
import { ProductService } from "./shared/services/product.service";


//동현임포트수정끝
@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IndexModule,
    ProductModule,
    UserModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    NoticeModule,
    AdminModule,
    TableModule,
    NgxPaginationModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
