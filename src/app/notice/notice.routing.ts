import { Routes } from "@angular/router";

import { AuthGuard } from "../shared/services/auth_gaurd";

import { NoticeComponent } from "./notice.component";
import { FaqComponent } from "./faq/faq.component";
import { QnaComponent } from "./qna/qna.component";

import { NoticeDetailComponent } from "./notice-detail/notice-detail.component";
import { FaqDetailComponent } from "./faq-detail/faq-detail.component";
import { QnaDetailComponent } from "./qna-detail/qna-detail.component";

import { QnaWriteComponent } from "./qna-write/qna-write.component";
import { QnaUpdateComponent } from "./qna-update/qna-update.component";

export const NoticeRoutes: Routes = [
  {
    path: "notice",
    children: [
      {
        path: "",
        component: NoticeComponent
      },
      {
        path: "faq",
        component: FaqComponent
      },
      {
        path: "qna",
        component: QnaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "qna/write",
        component: QnaWriteComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "qna/update",
        component: QnaUpdateComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: "detail",
    children: [
      {
        path: "notice",
        component: NoticeDetailComponent
      },
      {
        path: "faq",
        component: FaqDetailComponent
      },
      {
        path: "qna",
        component: QnaDetailComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
