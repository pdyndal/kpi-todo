import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { TodoModel } from 'src/app/interfaces';
import { TodoAddComponent } from '../todo-add/todo-add.component';
import { TodoDeleteComponent } from '../todo-delete/todo-delete.component';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
import * as actions from '../../state/todo.actions';
import { TodoState } from 'src/app/state/todo.state';
import { Observable } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {

  public todoItems$: Observable<TodoModel[]>;

  constructor(private dialog: MatDialog, private store: Store) { 
    this.todoItems$ = this.store.select<TodoModel[]>(state => state.Todos);
  }

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos(): void {
    this.store.dispatch(new actions.LoadTodosToState());
  }

  public sortListBy(type: "completed" | "name" | "id"): void {
    this.store.dispatch(new actions.SortTodos(type));
  }

  public changeTodoCompletedStatus(id: number, isChecked: boolean): void {
    this.store.dispatch(new actions.ChangeTodoStatus(id, isChecked)).subscribe(() => this.getTodos());
  }

  public addNewTodo(): void {
    const dialogRef = this.dialog.open(TodoAddComponent);
    dialogRef.afterClosed().subscribe(() => this.getTodos());
  }

  public deleteTodo(id: number): void {
    const dialogRef = this.dialog.open(TodoDeleteComponent, {
      data: { id }
    });
    dialogRef.afterClosed().subscribe(() => this.getTodos());
  }

  public openEdit(todo: TodoModel): void {
    const dialogRef = this.dialog.open(TodoEditComponent, {
      data: { todo }
    });
    dialogRef.afterClosed().subscribe(() => this.getTodos());
  }
}
