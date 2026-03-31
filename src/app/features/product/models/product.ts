import {Supplier} from '../../supplier/models/supplier';

export interface Product {
  id?: number;
  name: string;
  cost_price: any;
  sale_price: any;
  supplier_name: string;
  supplier: Supplier | string;
  product_group: string;

}
