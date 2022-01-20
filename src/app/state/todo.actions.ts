import { HttpParams } from "@angular/common/http";
import { TodoModel, TodoPostModel } from "../interfaces";

export class LoadTodosToState {
  static type = '[Todo] Load todos to state';
  constructor(public params?: HttpParams) {}
}

export class SortTodos {
  static type = '[Todo] Sort todos'
  constructor(public type: "completed" | "name" | "id") {}
}

export class AddTodo {
  static type = '[Todo] Add new todo'
  constructor(public newTodo: TodoPostModel) {}
}

export class DeleteTodo {
  static type = '[Todo] Delete todo'
  constructor(public id: number) {}
}

export class EditTodo {
  static type = '[Todo] Edit todo'
  constructor(public id: number, public todoToUpdate: TodoModel) {}
}

export class ChangeTodoStatus {
  static type = '[Todo] Change todo completion status';
  constructor(public id: number, public status: boolean) {}
}