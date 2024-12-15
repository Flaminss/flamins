import { Routes } from '@angular/router';
import { PackdrawComponent } from './components/packdraw/packdraw.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'packdraw',
    component: PackdrawComponent,
  },
];
