import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.scss']
})
export class TarefaListaComponent implements OnInit {
  tarefas: Tarefa[] = [];
  filtroStatus: string = '';
  carregando = false;
  mensagem: { tipo: 'sucesso' | 'erro'; texto: string } | null = null;

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.tarefaService.listar(this.filtroStatus || undefined).subscribe({
      next: (data) => {
        this.tarefas = data;
        this.carregando = false;
      },
      error: () => {
        this.exibirMensagem('erro', 'Erro ao carregar tarefas. Verifique se a API está rodando.');
        this.carregando = false;
      }
    });
  }

  excluir(id: number, titulo: string): void {
    if (!confirm(`Deseja excluir a tarefa "${titulo}"?`)) return;
    this.tarefaService.excluir(id).subscribe({
      next: () => {
        this.exibirMensagem('sucesso', 'Tarefa excluída com sucesso!');
        this.carregar();
      },
      error: () => {
        this.exibirMensagem('erro', 'Erro ao excluir a tarefa.');
      }
    });
  }

  filtrar(): void {
    this.carregar();
  }

  exibirMensagem(tipo: 'sucesso' | 'erro', texto: string): void {
    this.mensagem = { tipo, texto };
    setTimeout(() => this.mensagem = null, 4000);
  }
}
