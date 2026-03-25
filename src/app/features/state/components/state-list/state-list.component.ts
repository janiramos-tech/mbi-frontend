import {Component, inject, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {URLS} from '../../../../app.urls';
import {StateService} from '../../service/state.service';
import {StateDto} from '../../models/state.dto';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFabButton, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-state-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatCardModule, MatIconButton, MatFabButton],
  templateUrl: './state-list.component.html',
  styleUrl: './state-list.component.scss'
})
export class StateListComponent implements OnInit{

  private readonly stateService = inject(StateService);
  private readonly router = inject(Router);

  displayedColumns: string[] = ['id', 'name', 'acoes'];
  filter = '';
  stateList: StateDto[] = [];

  ngOnInit() {
    this.loadData();
  }
  loadData(): void {
    this.stateService.getAll({ filter: this.filter }).subscribe({
      next: (data) => {
        this.stateList = data.results;
        console.log('Produtos carregados:', this.stateList);
      },
      error: (err) => console.error('Erro ao carregar lista:', err)
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      // CORREÇÃO: Não passe o endpoint, apenas o ID.
      this.stateService.delete(id).subscribe({
        next: () => {
          console.log('Produto excluído com sucesso');
          this.loadData(); // Recarrega a lista
        },
        error: (err) => console.error('Erro ao excluir:', err)
      });
    }
  }

  updateProduct(idState: number): void {
    console.log('Navegando para edição do produto com ID:', idState);
    this.router.navigate(['/state', idState]).then();
  }

  public goToPage(route: string): void {
    // O merge garante que se você tiver filtros na URL, eles não sumam ao navegar
    const extras: NavigationExtras = { queryParamsHandling: "merge" };
    this.router.navigate([route], extras).then();
  }


}
