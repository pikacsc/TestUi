import { Routes, RouterModule } from "@angular/router";
import { AdminBoardComponent } from "./admin-board.component";
import { AdminNoticeComponent } from './admin-notice/admin-notice.component';
import { AdminFAQComponent } from './admin-faq/admin-faq.component';
import { AdminQnaComponent } from './admin-qna/admin-qna.component';
import { AdminProductQnaComponent } from './admin-product-qna/admin-product-qna.component';
import { AdminProductReviewComponent } from './admin-product-review/admin-product-review.component';

export const AdminBoardRoutes: Routes = [
  {
      path: "(adminOutlet:board)",
      component: AdminBoardComponent,
      children: [
        {
          path: "notice",
          component: AdminNoticeComponent,
          outlet: "adminBoardOutlet"
        },
        {
          path: "FAQ",
          component: AdminFAQComponent,
          outlet: "adminBoardOutlet"
        },
        {
          path: "QNA",
          component: AdminQnaComponent,
          outlet: "adminBoardOutlet"
        },
        {
          path: "productQnA",
          component: AdminProductQnaComponent,
          outlet: "adminBoardOutlet"
        },
        {
          path: "productReview",
          component: AdminProductReviewComponent,
          outlet: "adminBoardOutlet"
        }
      ]
    }
];
