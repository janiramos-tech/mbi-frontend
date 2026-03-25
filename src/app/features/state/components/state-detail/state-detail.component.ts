import {Component, inject, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {StateDto} from '../../models/state.dto';
import { HttpErrorResponse } from '@angular/common/http';
import {StateService} from '../../service/state.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-state-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatDividerModule
  ],
  templateUrl: './state-detail.component.html',
  styleUrl: './state-detail.component.scss'
})
export class StateDetailComponent implements OnInit{
  private readonly stateService = inject(StateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(UntypedFormBuilder);

  public object?: StateDto;
  public formGroup!: UntypedFormGroup;


  ngOnInit(): void {
    // 1. Crie o formulário PRIMEIRO (sempre)
    this.createFormGroup();
    this.route.paramMap.subscribe(params => {
      const id = params.get('action');
      if (id) {
        this.loadProduct(id);
      }
    });


    // 2. Pegue o ID da rota (verifique se o nome no seu app-routing é 'id')
    const id = this.route.snapshot.paramMap.get('action');

  }

  private loadProduct(id: string | number) {
    this.stateService.getById(id).subscribe({
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
      abbreviation: [null, [Validators.required]] // Validators devem estar em um array
    });
  }

  public saveOrUpdate(): void {
    if (this.formGroup.invalid) return;

    const data = { ...this.object, ...this.formGroup.value };

    // Note que não passamos mais a URL nem o Endpoint, o Service já sabe!
    let request$
    if(data.id) {
      request$ = this.stateService.update(data.id, data);
    }else{
      request$ = this.stateService.create(data);
    }
    request$.subscribe({
      next: () => {
        console.log('Operação realizada com sucesso');
        this.router.navigate(['/state']);
      },
      error: (err: HttpErrorResponse) => { // <--- Tipagem adicionada aqui
        console.error('Erro na operação:', err.message);
      }
    });
  }

}
