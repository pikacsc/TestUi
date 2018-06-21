import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from './admin.component';
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
import { AdminGaurd } from "../shared/services/admin-gaurd";

export const AdminRoutes: Routes = [
  {
    path: "admin", component: AdminComponent,
    children: [
      {
        path: "", component: AdminComponent, canActivate: [AdminGaurd]
      },
      {
        path: "product", component: AdminProductComponent, canActivate: [AdminGaurd],
        outlet: "adminOutlet"
      },
      {
        path: "order", component: AdminOrderComponent, canActivate: [AdminGaurd],
        outlet: "adminOutlet"
      },
      {
        path: "banner", component: AdminBannerComponent, canActivate: [AdminGaurd],
        outlet: "adminOutlet"
      },
      {
        path: "board", component: AdminBoardComponent, canActivate: [AdminGaurd],
        outlet: "adminOutlet"
      },
      {
        path:"employee", component : AdminEmployeeComponent, canActivate: [AdminGaurd],
        outlet: "adminOutlet"
      }
    ]
  }
];
