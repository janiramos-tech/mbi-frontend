import {Component, inject, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../../../shared/dialog/dialog.component';
import {Product} from '../../models/product';
import {ProductService} from '../../service/product.service';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFabButton, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  imports: [MatTableModule, MatIconModule, MatCardModule, MatIconButton, MatFabButton],
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  displayedColumns: string[] = ['id', 'name', 'supplier_name','acoes'];
  filter = '';
  productList: Product[] = [];

  private readonly dialog= inject(MatDialog);

  ngOnInit() {
    this.loadData();
  }
  loadData(): void {
    this.productService.getAll({ expand: this.filter }).subscribe({
      next: (data) => {
        this.productList = data.results;
      },
      error: (err) => console.error('Erro ao carregar lista:', err)
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "600px",
      data: {
        message: "Excluir Produto",
        description: "Tem certeza que deseja excluir este Produto? Esta ação não pode ser desfeita.",
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(id);
      } else {
        console.log('Exclusão cancelada pelo usuário');
      }
    });
  }

  deleteItem(id: number): void {
    this.productService.delete(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err) => console.error('Erro ao excluir:', err)
    });
  }

  updateProduct(idState: number): void {
    this.router.navigate(['/product', idState]).then();
  }

  public goToPage(route: string): void {
    const extras: NavigationExtras = { queryParamsHandling: "merge" };
    this.router.navigate([route], extras).then();
  }



}
