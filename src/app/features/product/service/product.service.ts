import { Injectable } from '@angular/core';
import {BaseService} from '../../../core/services/base.service';
import {Product} from '../models/product';
import {URLS} from '../../../app.urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product>{
  protected endpoint = URLS.PRODUCT;

}
