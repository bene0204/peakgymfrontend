import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HeaderComponent} from "./components/header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MembershiptypesComponent} from "./shared/components/membershiptypes/membershiptypes.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginDialogComponent} from "./components/dialog/login-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {HasRoleDirective} from "./shared/directive/hasRole.directive";
import {UserProfileComponent} from "./components/user-profile.component/user-profile.component";
import {UserMembershipsComponent} from "./components/user-memberships/user-memberships.component";
import {TokenInterceptor} from "./shared/interceptors/TokenInterceptor";
import {MatCardModule} from "@angular/material/card";
import {HomeComponent} from "./components/home/home.component";
import {UserSearchComponent} from "./components/user-search/user-search.component";
import {DatePickerDialogComponent} from "./components/dialog/date-picker-dialog/date-picker-dialog.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {UserProductsComponent} from "./components/user-products/user-products.component";
import {ProductTypesComponent} from "./components/product-types/product-types.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MembershiptypesComponent,
    LoginDialogComponent,
    HasRoleDirective,
    UserProfileComponent,
    UserMembershipsComponent,
    HomeComponent,
    UserSearchComponent,
    DatePickerDialogComponent,
    UserProductsComponent,
    ProductTypesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
