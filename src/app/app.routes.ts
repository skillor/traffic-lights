import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ConnectComponent } from './connect/connect.component';

export const routes: Routes = [
  { path: '', component: ConnectComponent, pathMatch: 'full' },
  { path: ':ip', component: OverviewComponent, pathMatch: 'full' },
  { path: ':ip/:id', component: OverviewComponent }
];
