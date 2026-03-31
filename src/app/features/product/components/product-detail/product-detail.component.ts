import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {SupplierService} from '../../../supplier/service/supplier.service';
import {Supplier} from '../../../supplier/models/supplier';
import {HttpErrorResponse} from '@angular/common/http';
import {Product} from '../../models/product';
import {ProductService} from '../../service/product.service';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatDividerModule,
    MatSelect,
    MatOption],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(UntypedFormBuilder);
  private readonly supplierService = inject(SupplierService);

  public object?: Product;
  public formGroup!: UntypedFormGroup;
  supplierList: Supplier[]= [];

  ngOnInit(): void {
    this.createFormGroup();
    this.route.paramMap.subscribe(params => {
      const id = params.get('action');
      if (id) {
        this.loadProduct(id);
      }
      this.loadSupplierList();
    });
  }

  private loadProduct(id: string | number) {
    this.productService.getById(id).subscribe({
      next: (data) => {
        this.object = data;
        // O patchValue só funciona se os nomes dos campos no HTML/FormGroup
        // forem IGUAIS aos que vêm da API (id, name, abbreviation)
        this.formGroup.patchValue(data);
      },
      error: (err) => console.error('Erro ao buscar dados para edição', err)
    });
  }

  private createFormGroup() {
    this.formGroup = this.fb.group({
      name: [null, [Validators.required]],
      sale_price: [null, [Validators.required]],
      cost_price: [null, [Validators.required]],
      supplier: [null, [Validators.required]],
      product_group: [null],
    });
  }

  public saveOrUpdate(): void {
    if (this.formGroup.invalid) return;
    const data = { ...this.object, ...this.formGroup.value };
    let request$;

    if(data.id) {
      request$ = this.productService.update(data.id, data);
    }else{
      request$ = this.productService.create(data);
    }
    request$.subscribe({
      next: () => {
        console.log('Operação realizada com sucesso');
        this.router.navigate(['/product']);
      },
      error: (err: HttpErrorResponse) => { // <--- Tipagem adicionada aqui
        console.error('Erro na operação:', err.message);
      }
    });
  }

  loadSupplierList(): void {
    this.supplierService.getAll().subscribe({
      next: (data) => {
        this.supplierList = data.results;
        console.log('Fornecedores carregados:', data.results);
      },
      error: (err) => console.error('Erro ao carregar fornecedores:', err)
    });


  }

}
