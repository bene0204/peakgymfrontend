import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserProfileComponent} from "./components/user-profile.component/user-profile.component";
import {UserMembershipsComponent} from "./components/user-memberships/user-memberships.component";
import {HomeComponent} from "./components/home/home.component";
import {UserSearchComponent} from "./components/user-search/user-search.component";
import {UserProductsComponent} from "./components/user-products/user-products.component";
import {CartComponent} from "./components/cart/cart.component";
import {MembershipManagementComponent} from "./components/membership-management/membership-management.component";
import {ProductManagementComponent} from "./components/product-management/product-management.component";
import {ContactComponent} from "./components/contact/contact.component";
import {GalleryComponent} from "./components/gallery/gallery.component";
import {AdminGuard} from "./shared/service/AdminGuard";
import {ManagementGuard} from "./shared/service/ManagementGuard";
import {LoginGuard} from "./shared/service/LoginGuard";
import {MembershipTypesPageComponent} from "./components/memberhiptypespage/membership-types-page.component";

const routes: Routes = [
  {path: "", pathMatch: "full", component: HomeComponent},
  {path: "membershiptypes", component: MembershipTypesPageComponent},
  {path: "contact", component: ContactComponent},
  {path: "gallery", component: GalleryComponent},
  {path: "profile/me", component: UserProfileComponent , canActivate: [LoginGuard],
    children: [
      {path: "memberships", component: UserMembershipsComponent, canActivate: [LoginGuard]}
    ]},
  {path: "profile/:userId", component:UserProfileComponent, canActivate: [ManagementGuard],
    children: [
      {path: "memberships", component: UserMembershipsComponent, canActivate: [ManagementGuard]},
      {path: "products", component: UserProductsComponent, canActivate: [ManagementGuard]},
      {path: "cart", component: CartComponent, canActivate: [ManagementGuard]}
    ]},
  {path: "membership-management", component: MembershipManagementComponent, canActivate: [AdminGuard]},
  {path: "product-management", component: ProductManagementComponent, canActivate: [AdminGuard]},
  {path: "search", component: UserSearchComponent, canActivate: [ManagementGuard]},
  {path: "**", redirectTo: ""}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
