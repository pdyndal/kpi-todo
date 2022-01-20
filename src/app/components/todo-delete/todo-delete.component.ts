import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { DeleteTodo } from 'src/app/state/todo.actions';

@Component({
  selector: 'app-todo-delete',
  templateUrl: './todo-delete.component.html',
  styleUrls: ['./todo-delete.component.sass']
})
export class TodoDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TodoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.store.dispatch(new DeleteTodo(this.data.id)).subscribe(() => this.dialogRef.close())
  }

}
