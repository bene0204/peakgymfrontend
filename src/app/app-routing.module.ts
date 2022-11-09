import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MembershiptypesComponent} from "./components/membership/membershiptypes.component";
import {UserProfileComponent} from "./components/user-profile.component/user-profile.component";
import {UserMembershipsComponent} from "./components/user-memberships/user-memberships.component";

const routes: Routes = [
  {path: "membershiptypes", component: MembershiptypesComponent},
  {path: "profile/me", component: UserProfileComponent ,
    children: [
      {path: "memberships", component: UserMembershipsComponent}
    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
