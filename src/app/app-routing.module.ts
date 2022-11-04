import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MembershiptypesComponent} from "./components/membership/membershiptypes.component";

const routes: Routes = [
  {path: "membershiptypes", component: MembershiptypesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
