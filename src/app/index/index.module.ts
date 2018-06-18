// Core Dependencies
import { RouterModule } from "@angular/router";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IndexRoutes } from "./index.routing";

import { ProductModule } from "./../product/product.module";
import { UserModule } from "../user/user.module";

// Components
import { IndexComponent } from "./index.component";
import { LoginComponent } from "./login/login.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";

import { LocalFavouritePageComponent } from "./local-favourite-page/local-favourite-page.component";
import { LocalCartItemComponent } from "./local-cart-item/local-cart-item.component";
import { SharedModule } from "../shared/shared.module";
import { NgDaumAddressModule } from 'ng2-daum-address';
import { AdminLoginComponent } from './admin-login/admin-login.component';
@NgModule({
  imports: [
    CommonModule,
    ProductModule,
    SharedModule,
    RouterModule.forChild(IndexRoutes),
    NgDaumAddressModule
  ],
  declarations: [
    IndexComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    LocalFavouritePageComponent,
    LocalCartItemComponent,
    AdminLoginComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [NavbarComponent, FooterComponent],
  providers: []
})
export class IndexModule {}
