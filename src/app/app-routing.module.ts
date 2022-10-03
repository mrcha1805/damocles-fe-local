import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateKpiComponent } from './components/create-kpi/create-kpi.component';
import { HomeComponent } from './components/home/home.component';
import { DemographicComponent } from './components/demographic/demographic.component';
import { FunnelChartComponent } from './components/funnel-chart/funnel-chart.component';
import { KpiByProductComponent } from './components/kpi-by-product/kpi-by-product.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
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
  {
    path: 'workspace',
    component: WorkspaceComponent,
  },
  {
    path: 'funnel-chart',
    component: FunnelChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
