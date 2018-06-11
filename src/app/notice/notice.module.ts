import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

import { NoticeRoutes } from "./notice.routing";

import { IndexModule } from "../index/index.module";
import { ProductModule } from "../product/product.module";
import { UserModule } from "../user/user.module";
import { SharedModule } from "../shared/shared.module";

import { NoticeComponent } from './notice.component';
import { NoticeListComponent } from './notice-list/notice-list.component'
import { FaqComponent } from './faq/faq.component';
import { QnaComponent } from './qna/qna.component';

import { NoticeDetailComponent } from './notice-detail/notice-detail.component';
import { FaqDetailComponent } from './faq-detail/faq-detail.component';
import { QnaDetailComponent } from './qna-detail/qna-detail.component';

import { QnaWriteComponent } from './qna-write/qna-write.component';
import { QnaUpdateComponent } from './qna-update/qna-update.component';

@NgModule({
  declarations: [NoticeComponent, NoticeListComponent, FaqComponent, QnaComponent,
    NoticeDetailComponent, FaqDetailComponent, QnaDetailComponent, QnaWriteComponent, QnaUpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(NoticeRoutes),
    IndexModule,
    ProductModule,
    UserModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class NoticeModule { }
