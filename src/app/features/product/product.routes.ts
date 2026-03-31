import {Routes} from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/product-list/product-list.component')
        .then(c => c.ProductListComponent)
  },
  {
    path: ':action',
    loadComponent: () =>
      import('./components/product-detail/product-detail.component')
        .then(c => c.ProductDetailComponent)
  }];
