import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MembershiptypesComponent} from "./shared/components/membershiptypes/membershiptypes.component";
import {UserProfileComponent} from "./components/user-profile.component/user-profile.component";
import {UserMembershipsComponent} from "./components/user-memberships/user-memberships.component";
import {HomeComponent} from "./components/home/home.component";
import {UserSearchComponent} from "./components/user-search/user-search.component";
import {UserProductsComponent} from "./components/user-products/user-products.component";

const routes: Routes = [
  {path: "", pathMatch: "full", component: HomeComponent},
  {path: "membershiptypes", component: MembershiptypesComponent},
  {path: "profile/me", component: UserProfileComponent ,
    children: [
      {path: "memberships", component: UserMembershipsComponent}
    ]},
  {path: "profile/:userId", component:UserProfileComponent,
    children: [
      {path: "memberships", component: UserMembershipsComponent},
      {path: "products", component: UserProductsComponent}
    ]},
  {path: "search", component: UserSearchComponent},
  {path: "**", redirectTo: ""}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
