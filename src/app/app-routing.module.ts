import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateKpiComponent } from './components/create-kpi/create-kpi.component';
import { DemographicComponent } from './components/demographic/demographic.component';
import { FunnelChartComponent } from './components/funnel-chart/funnel-chart.component';
import { KpiByProductComponent } from './components/kpi-by-product/kpi-by-product.component';
import { LoginComponent } from './components/login/login.component';
import { NewProjectComponent } from './components/new-project/new-project.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'funnel',
    pathMatch: 'full',
  },
  {
    path: 'funnel',
    component: FunnelChartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'demographic',
    component: DemographicComponent,
  },
  {
    path: 'create-project',
    component: NewProjectComponent,
  },
  {
    path: 'kpi',
    component: KpiByProductComponent,
  },
  {
    path: 'create-kpi',
    component: CreateKpiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
