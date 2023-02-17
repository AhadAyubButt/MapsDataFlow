import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStoreComponent } from './list-store/list-store.component';
import { ListMetricsComponent } from './list-metrics/list-metrics.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home/dashboard",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "emailstatus",
        component: ListMetricsComponent
      },
      {
        path: "liststores",
        component: ListStoreComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
