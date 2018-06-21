import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { RouterModule } from "@angular/router";
import { AdminComponent } from './admin.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminBannerComponent } from './admin-banner/admin-banner.component';
import { AdminEmployeeComponent } from './admin-employee/admin-employee.component';
import { AdminRoutes } from './admin.routing';
import { SharedModule } from "../shared/shared.module";
import { ProductService } from "../shared/services/product.service";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { TokenService } from '../shared/services/token.service';
import { SidenavService } from '../shared/services/sidenav.service';
import { AdminBoardModule } from './admin-board/admin-board.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    SharedModule,
    Ng2SmartTableModule,
    FileUploadModule,
    AdminBoardModule
  ],
  declarations: [
    AdminComponent,
    AdminProductComponent,
    AdminBannerComponent,
    AdminEmployeeComponent,
    AdminOrderComponent
  ],
  exports: []
  ,providers: [ProductService,TokenService,SidenavService]
})
export class AdminModule { }
