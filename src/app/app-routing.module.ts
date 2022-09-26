import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateKpiComponent } from './components/create-kpi/create-kpi.component';
import { DemographicComponent } from './components/demographic/demographic.component';
import { KpiByProductComponent } from './components/kpi-by-product/kpi-by-product.component';
import { LoginComponent } from './components/login/login.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import {WorkspaceComponent } from './components/workspace/workspace.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'funnel',
    pathMatch: 'full',
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
  {
    path: 'workspace',
    component: WorkspaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
