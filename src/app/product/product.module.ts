// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// configuration and services
import { ProductRoutes } from "./product.routing";

// Components
import { ProductComponent } from "./product.component";
import { BestProductComponent } from "./best-product/best-product.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { SharedModule } from "../shared/shared.module";
import { ProductReviewComponent} from "./product-review/product-review.component";
import { ProductReviewDetailComponent} from "./product-review-detail/product-review-detail.component";

import { ProductService } from "../shared/services/product.service";
import { ReviewService } from "../shared/services/review.service";
import { ProductQnaComponent } from './product-qna/product-qna.component';
import { ProductQnaService} from "../shared/services/product-qna.service";
import { ProductQnaDetailComponent } from './product-qna-detail/product-qna-detail.component';
import { ProductReviewWriteComponent } from './product-review-write/product-review-write.component';
import { ProductQnaWriteComponent } from './product-qna-write/product-qna-write.component';
import { ProductReviewUpdateComponent } from './product-review-update/product-review-update.component';
import { ProductQnaUpdateComponent } from './product-qna-update/product-qna-update.component';


//동현임포트수정

//동현임포트수정끝
@NgModule({
  imports: [CommonModule, RouterModule.forChild(ProductRoutes), SharedModule],
  declarations: [
    ProductComponent,
    BestProductComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductReviewComponent,
    ProductQnaComponent,
    ProductQnaDetailComponent,
    ProductReviewDetailComponent,
    ProductReviewWriteComponent,
    ProductQnaWriteComponent,
    ProductReviewUpdateComponent,
    ProductQnaUpdateComponent,
    ProductReviewDetailComponent

  ],
  exports: [BestProductComponent],
  providers: [
    ProductService,
    ReviewService,
    ProductQnaService
  ],
})
export class ProductModule {}
