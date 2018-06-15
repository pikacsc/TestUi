// Core Dependencies
import { RouterModule } from "@angular/router";
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { CommonModule } from "@angular/common";


import { NgDaumAddressModule } from 'ng2-daum-address';
// Configuration and Services
import { UserRoutes } from "./user.routing";

// Components
import { UserComponent } from "./user.component";
import { UserAccountComponent } from "./user-account/user-account.component";
import { UserFavouriteProductsComponent } from "./user-favourite-products/user-favourite-products.component";
import { UserCartItemsComponent } from "./user-cart-items/user-cart-items.component";
import { SharedModule } from "../shared/shared.module";
import { UserOrderWriteComponent } from './user-order-write/user-order-write.component';
import { UserOrderListComponent } from './user-order-list/user-order-list.component';

import { UserService } from "../shared/services/user.service";
import { ProductService } from '../shared/services/product.service';
import { AuthGuard } from "../shared/services/auth_gaurd";
import { AuthService } from "../shared/services/auth.service";
import { UserMainComponent } from './user-main/user-main.component';
@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(UserRoutes), NgDaumAddressModule],
  declarations: [
    UserComponent,
    UserAccountComponent,
    UserFavouriteProductsComponent,
    UserCartItemsComponent,
    UserOrderWriteComponent,
    UserOrderListComponent,
    UserMainComponent

  ],
  providers: [
    UserService,
    ProductService,
    AuthGuard,
    AuthService
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule {}
