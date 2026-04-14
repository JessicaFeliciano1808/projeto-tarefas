import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './tarefa-form.component.html',
  styleUrls: ['./tarefa-form.component.scss']
})
export class TarefaFormComponent implements OnInit {
  form!: FormGroup;
  tarefaId: number | null = null;
  carregando = false;
  salvando = false;
  mensagem: { tipo: 'sucesso' | 'erro'; texto: string } | null = null;

  get isEdicao(): boolean {
    return this.tarefaId !== null;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefaService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(200)]],
      descricao: ['', Validators.maxLength(1000)],
      status: ['Pendente', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tarefaId = Number(id);
      this.carregarTarefa(this.tarefaId);
    }
  }

  carregarTarefa(id: number): void {
    this.carregando = true;
    this.tarefaService.buscarPorId(id).subscribe({
      next: (tarefa) => {
        this.form.patchValue(tarefa);
        this.carregando = false;
      },
      error: () => {
        this.mensagem = { tipo: 'erro', texto: 'Tarefa não encontrada.' };
        this.carregando = false;
        setTimeout(() => this.router.navigate(['/tarefas']), 2000);
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    const tarefa: Tarefa = this.form.value;

    const request$ = this.isEdicao
      ? this.tarefaService.atualizar(this.tarefaId!, { ...tarefa, id: this.tarefaId! })
      : this.tarefaService.criar(tarefa);

    request$.subscribe({
      next: () => {
        this.salvando = false;
        this.router.navigate(['/tarefas']);
      },
      error: () => {
        this.salvando = false;
        this.mensagem = { tipo: 'erro', texto: 'Erro ao salvar tarefa. Tente novamente.' };
      }
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
