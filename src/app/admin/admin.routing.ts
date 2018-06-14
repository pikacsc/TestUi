import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminBannerComponent } from './admin-banner/admin-banner.component';
import { AdminEmployeeComponent } from './admin-employee/admin-employee.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';

export const AdminRoutes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "",
        component: AdminComponent
      },
      {
        path: "login",
        component: AdminLoginComponent
      },
      {
        path: "product",
        component: AdminProductComponent,
        outlet: "adminOutlet"
      },
      {
        path: "order",
        component: AdminOrderComponent,
        outlet: "adminOutlet"
      },
      {
        path: "banner",
        component: AdminBannerComponent,
        outlet: "adminOutlet"
      },
      {
        path:"employee",
        component : AdminEmployeeComponent,
        outlet: "adminOutlet"
      }
    ]
  }
];
