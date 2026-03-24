import {Routes} from "@angular/router";

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/state-list/state-list.component')
        .then(c => c.StateListComponent)
  },
  {
    path: ':action',
    loadComponent: () =>
      import('./components/state-detail/state-detail.component')
        .then(c => c.StateDetailComponent)
  }];
