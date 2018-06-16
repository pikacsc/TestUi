import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNoticeComponent } from './admin-notice/admin-notice.component';
import { AdminFAQComponent } from './admin-faq/admin-faq.component';
import { AdminQnaComponent } from './admin-qna/admin-qna.component';
import { AdminProductQnaComponent } from './admin-product-qna/admin-product-qna.component';
import { AdminProductReviewComponent } from './admin-product-review/admin-product-review.component';
import { AdminBoardComponent } from './admin-board.component';
import { TableModule } from 'primeng/table';


@NgModule({
  imports: [
    CommonModule,
    TableModule
  ],
  declarations: [
    AdminBoardComponent,
    AdminNoticeComponent,
    AdminFAQComponent,
    AdminQnaComponent,
    AdminProductQnaComponent,
    AdminProductReviewComponent
  ],
  exports: [
      AdminBoardComponent,
      AdminNoticeComponent,
      AdminFAQComponent,
      AdminQnaComponent,
      AdminProductQnaComponent,
      AdminProductReviewComponent
  ]
})
export class AdminBoardModule { }
