import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateKpiComponent } from './components/create-kpi/create-kpi.component';
import { DemographicComponent } from './components/demographic/demographic.component';
import { KpiByProductComponent } from './components/kpi-by-product/kpi-by-product.component';
import { LoginComponent } from './components/login/login.component';
import { NewProjectComponent } from './components/new-project/new-project.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'demographic',
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
    path: 'createproject',
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
