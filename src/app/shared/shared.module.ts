import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoProductsFoundComponent } from "./components/no-products-found/no-products-found.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastyModule } from "ng2-toasty";
import { RouterModule, Router } from "@angular/router";
import { OwlModule } from "ngx-owl-carousel";
import { NgxPaginationModule } from "ngx-pagination";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { NoAccessComponent } from "./components/no-access/no-access.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { FilterByKindPipe } from "./pipes/filterByKind.pipe";
import { ProductService } from "./services/product.service";
import { AdminGaurd } from "./services/admin-gaurd";
import { AuthGuard } from "./services/auth_gaurd";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { LoaderSpinnerService } from "./loader-spinner/loader-spinner";
import { TokenService } from "./services/token.service";
import { NoticeService } from "./services/notice.service";
import { FaqService } from "./services/faq.service";
import { QnaService } from "./services/qna.service";
import { SearchService } from "./services/search.service";
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SidenavService } from './services/sidenav.service';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ToastyModule.forRoot(),
    OwlModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDMbxW3MlwUP2vrAZVJyu7pYqZa1LthvTE"
    })
  ],

  declarations: [
    NoProductsFoundComponent,
    FilterByKindPipe,
    NoAccessComponent,
    PageNotFoundComponent,
    FileUploadComponent
  ],

  exports: [
    NoProductsFoundComponent,
    FormsModule,
    MDBBootstrapModule,
    FormsModule,
    ToastyModule,
    RouterModule,
    OwlModule,
    NgxPaginationModule,
    FilterByKindPipe,
    AgmCoreModule,
    FileUploadComponent,
    NoAccessComponent,
    PageNotFoundComponent
  ],

  providers: [
    TokenService,
    AuthService,
    AuthGuard,
    AdminGaurd,
    ProductService,
    UserService,
    LoaderSpinnerService,
    NoticeService,
    FaqService,
    QnaService,
    SearchService,
    SidenavService
  ]
})
export class SharedModule {}
