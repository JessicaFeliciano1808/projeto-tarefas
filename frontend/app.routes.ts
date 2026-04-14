import { Routes } from '@angular/router';
import { TarefaListaComponent } from './tarefas/tarefa-lista/tarefa-lista.component';
import { TarefaFormComponent } from './tarefas/tarefa-form/tarefa-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tarefas', pathMatch: 'full' },
  { path: 'tarefas', component: TarefaListaComponent },
  { path: 'tarefas/nova', component: TarefaFormComponent },
  { path: 'tarefas/editar/:id', component: TarefaFormComponent },
  { path: '**', redirectTo: 'tarefas' }
];
