import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DatePipe } from '@angular/common';
import {
  NgxPopperjsModule,
  NgxPopperjsOptions,
  NgxPopperjsTriggers,
} from 'ngx-popperjs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthModule } from './auth/auth.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { NewProjectComponent } from './components/new-project/new-project.component';
import { KpiByProductComponent } from './components/kpi-by-product/kpi-by-product.component';
import { NavbarLogoComponent } from './components/navbar-logo/navbar-logo.component';
import { CreateKpiComponent } from './components/create-kpi/create-kpi.component';
import { DemographicComponent } from './components/demographic/demographic.component';
import { HomeComponent } from '@components/home/home.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchFilterPipe } from './services/search-filter.pipe';
import { DeleteProjectModalComponent } from './modals/delete-project-modal/delete-project-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ClearallWorkspaceModalComponent } from './modals/clearall-workspace-modal/clearall-workspace-modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SaveSuccessWorkspaceModalComponent } from './modals/save-success-workspace-modal/save-success-workspace-modal.component';
import { SaveWorkspaceModalComponent } from './modals/save-workspace-modal/save-workspace-modal.component';
import { SaveExistsWorkspaceModalComponent } from './modals/save-exists-workspace-modal/save-exists-workspace-modal.component';
import { FunnelChartComponent } from './components/funnel-chart/funnel-chart.component';
import { FilterSliderComponent } from './components/filter-slider/filter-slider.component';
import { AppConfigService } from './services/app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterItemComponent } from './components/filter-item/filter-item.component';
import { FeatureSearchFilterPipe } from './services/feature-search-filter.pipe';
import { FilterLocationComponent } from './components/filter-location/filter-location.component';
import { CriterionSearchPipe } from './services/criterion-search.pipe';
export function initializeApp(appConfigService: AppConfigService) {
  return (): Promise<any> => {
    return appConfigService.load();
  };
}

export const TOOLTIP_DEFAULT_OPTIONS: NgxPopperjsOptions = {
  trigger: NgxPopperjsTriggers.hover,
  showDelay: 500,
  ariaRole: 'tooltip',
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewProjectComponent,
    KpiByProductComponent,
    NavbarLogoComponent,
    CreateKpiComponent,
    DemographicComponent,
    FilterComponent,
    SearchFilterPipe,
    DeleteProjectModalComponent,
    WorkspaceComponent,
    ClearallWorkspaceModalComponent,
    SaveSuccessWorkspaceModalComponent,
    SaveWorkspaceModalComponent,
    SaveExistsWorkspaceModalComponent,
    FunnelChartComponent,
    FilterSliderComponent,
    FilterItemComponent,
    FeatureSearchFilterPipe,
    FilterLocationComponent,
    CriterionSearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    CollapseModule.forRoot(),
    NgxPopperjsModule.forRoot(TOOLTIP_DEFAULT_OPTIONS),
    NgxSpinnerModule,
    AuthModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgbModule,
    DragDropModule,
    HttpClientModule,
    NgxSliderModule,
  ],
  providers: [
    DatePipe,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true,
    },
    {
      provide: ErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
