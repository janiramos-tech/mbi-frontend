import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./layout/home/home.component").then(c => c.HomeComponent),
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
    ]
  },
];
