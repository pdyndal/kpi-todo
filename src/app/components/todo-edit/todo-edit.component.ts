import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { TodoModel } from 'src/app/interfaces';
import { EditTodo } from 'src/app/state/todo.actions';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.sass']
})
export class TodoEditComponent implements OnInit {

  public titleFormControl = new FormControl('', [Validators.required, Validators.minLength(3)])

  public todoToModify: TodoModel = this.data.todo;

  constructor(
    public dialogRef: MatDialogRef<TodoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {todo: TodoModel},
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  updateTodo(): void {
    this.store.dispatch(new EditTodo(this.todoToModify.id, this.todoToModify)).subscribe(() => {
      this.dialogRef.close();
    })
  }
}
