import { ProductListComponent } from "./product-list/product-list.component";
import { Routes } from "@angular/router";
import { IndexComponent } from "../index/index.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import {ProductReviewDetailComponent} from "./product-review-detail/product-review-detail.component";
import {ProductReviewWriteComponent} from "./product-review-write/product-review-write.component";
import {ProductQnaWriteComponent} from "./product-qna-write/product-qna-write.component";
import {ProductQnaDetailComponent} from "./product-qna-detail/product-qna-detail.component";
import {ProductReviewUpdateComponent} from "./product-review-update/product-review-update.component";
import {ProductQnaUpdateComponent} from "./product-qna-update/product-qna-update.component";

import { AuthGuard } from "../shared/services/auth_gaurd";

export const ProductRoutes: Routes = [
  {
    path: "products",
    children: [
      {
        path: "",
        component: IndexComponent
      },
      {
        path: "all-products",
        component: ProductListComponent
      },
      {
        path: "product/:p_code",
        component: ProductDetailComponent
      },

      {
        path:":p_kind",
        component : ProductListComponent
      },

      {
        path:"review/:rev_no",
        component: ProductReviewDetailComponent

      },

      {
        path:"qna/:pq_no",
        component: ProductQnaDetailComponent

      },

      {
        path:"productqna/write",
        component: ProductQnaWriteComponent,
        canActivate: [AuthGuard]
      },

      {
        path:"productreview/write",
        component: ProductReviewWriteComponent,
        canActivate: [AuthGuard]
      },

      {
        path:"productreview/update",
        component: ProductReviewUpdateComponent,
        canActivate: [AuthGuard]
      },

      {
        path:"productqna/update",
        component: ProductQnaUpdateComponent,
        canActivate: [AuthGuard]
      }


    ]
  }
];
