import {Component, inject, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Router} from '@angular/router';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {StateDto} from '../../models/state.dto';
import { HttpErrorResponse } from '@angular/common/http';
import {StateService} from '../../service/state.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-state-detail',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule, // <--- ADICIONE ESTE
    MatInputModule ],    // <--- E ESTE],
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

    // 2. Pegue o ID da rota (verifique se o nome no seu app-routing é 'id')
    const id = this.route.snapshot.paramMap.get('action');

    if (id) {
      console.log('Iniciando edição do ID:', id);
      this.loadProduct(id);
    }
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
    data.abbreviation = 'NA';

    // Note que não passamos mais a URL nem o Endpoint, o Service já sabe!
    const request$ = data.id
      ? this.stateService.update(data.id, data)
      : this.stateService.create(data);

    request$.subscribe({
      next: () => {
        console.log('Operação realizada com sucesso');
        this.router.navigate(['/produtos']);
      },
      error: (err: HttpErrorResponse) => { // <--- Tipagem adicionada aqui
        console.error('Erro na operação:', err.message);
      }
    });
  }


  // Convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  // Convenience getter for easy access to form fields values
  get v() {
    return this.formGroup.value;
  }



}
