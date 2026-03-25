import { Routes } from '@angular/router';
import {AppMenuComponent} from './layout/app-menu/app-menu.component';

export const routes: Routes = [
  {
    path: '',
    component: AppMenuComponent,
    children: [
      {
        path: "home",
        loadComponent: () => import("./layout/home/home.component").then(c => c.HomeComponent),
      },
      {
        path: 'state',
        loadChildren: () =>
          import('./features/state/state.routes')
            .then(r => r.PRODUCTS_ROUTES)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
];
