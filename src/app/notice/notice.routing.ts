import { Routes } from "@angular/router";

import { NoticeComponent } from "./notice.component";
import { FaqComponent } from "./faq/faq.component";
import { QnaComponent } from "./qna/qna.component";

import { NoticeDetailComponent } from "./notice-detail/notice-detail.component";
import { FaqDetailComponent } from "./faq-detail/faq-detail.component";
import { QnaDetailComponent } from "./qna-detail/qna-detail.component";

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
        component: QnaComponent
      }
    ]
  },
  {
    path: "detail",
    children: [
      {
        path: "notice/:id",
        component: NoticeDetailComponent
      },
      {
        path: "faq/:id",
        component: FaqDetailComponent
      },
      {
        path: "qna/:id",
        component: QnaDetailComponent
      }
    ]
  }
];
