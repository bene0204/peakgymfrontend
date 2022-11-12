import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MembershiptypesComponent} from "./components/membership/membershiptypes.component";
import {UserProfileComponent} from "./components/user-profile.component/user-profile.component";
import {UserMembershipsComponent} from "./components/user-memberships/user-memberships.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: "", pathMatch: "full", component: HomeComponent},
  {path: "membershiptypes", component: MembershiptypesComponent},
  {path: "profile/me", component: UserProfileComponent ,
    children: [
      {path: "memberships", component: UserMembershipsComponent}
    ]},
  {path: "**", redirectTo: ""}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
