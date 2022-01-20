import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { TodoPostModel } from 'src/app/interfaces';
import { AddTodo } from 'src/app/state/todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.sass']
})
export class TodoAddComponent implements OnInit {

  public titleFormControl = new FormControl('', [Validators.required, Validators.minLength(3)])

  public newTodo: TodoPostModel = {
    completed: false,
    userId: 4,
    title: '',
  }

  constructor(
    public dialogRef: MatDialogRef<TodoAddComponent>,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  addTodo(): void {
    this.store.dispatch(new AddTodo(this.newTodo)).subscribe(() => {
      this.dialogRef.close();
    })
  }
}
