import { Injectable } from '@angular/core';
import {BaseService} from '../../../core/services/base.service';
import {Supplier} from '../models/supplier';
import {URLS} from '../../../app.urls';

@Injectable({
  providedIn: 'root'
})
export class SupplierService  extends BaseService<Supplier>{

  protected readonly endpoint = URLS.SUPPLIER;

}
