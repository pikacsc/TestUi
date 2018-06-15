import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminBannerComponent } from './admin-banner/admin-banner.component';
import { AdminEmployeeComponent } from './admin-employee/admin-employee.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';

import { AdminNoticeComponent } from './admin-board/admin-notice/admin-notice.component';
import { AdminFAQComponent } from './admin-board/admin-faq/admin-faq.component';
import { AdminQnaComponent } from './admin-board/admin-qna/admin-qna.component';
import { AdminProductQnaComponent } from './admin-board/admin-product-qna/admin-product-qna.component';
import { AdminProductReviewComponent } from './admin-board/admin-product-review/admin-product-review.component';


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
        path: "board",
        component: AdminBoardComponent,
        outlet: "adminOutlet",
      },
      {
        path:"employee",
        component : AdminEmployeeComponent,
        outlet: "adminOutlet"
      }
    ]
  }
];
