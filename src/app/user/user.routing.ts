import { UserComponent } from "./user.component";
import { UserAccountComponent } from "./user-account/user-account.component";
import { Routes, RouterModule } from "@angular/router";
import { UserFavouriteProductsComponent } from "./user-favourite-products/user-favourite-products.component";
import { UserCartItemsComponent } from "./user-cart-items/user-cart-items.component";
import {UserOrderWriteComponent} from './user-order-write/user-order-write.component';
import {UserOrderListComponent} from './user-order-list/user-order-list.component';
import { AuthGuard } from "../shared/services/auth_gaurd";
import { AuthService } from "../shared/services/auth.service";
import { UserMainComponent } from './user-main/user-main.component';
export const UserRoutes: Routes = [
  {
    path: "users",
    component: UserComponent,
    children: [
      {
        path: "",
        component: UserMainComponent,
        outlet: "profileOutlet"
        // ,canActivate:[AuthGuard]
      }
      ,{
        path: "user-main",
        component: UserMainComponent,
        outlet: "profileOutlet"
        // ,canActivate:[AuthGuard]
      },
      {
        path: "user-info",
        component: UserAccountComponent,
        outlet: "profileOutlet",
        canActivate:[AuthGuard]

      },
      {
        path: "favourite-products",
        component: UserFavouriteProductsComponent,
        outlet: "profileOutlet"

      },
      {
        path: "cart-items",
        component: UserCartItemsComponent,
        outlet: "profileOutlet",
        canActivate:[AuthGuard]
      },
      {
        path:"order-write",
        component: UserOrderWriteComponent,
        outlet:"profileOutlet",
        canActivate:[AuthGuard]
      },
      {
        path:"order-list",
        component: UserOrderListComponent,
        outlet:"profileOutlet",
        canActivate:[AuthGuard]
      }
    ]
  }
];
