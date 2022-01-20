import { Injectable } from "@angular/core";
import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { TodoModel } from "../interfaces";
import { ApiService } from "../services/api.service";
import * as actions from './todo.actions';

const TODO_STATE_TOKEN = new StateToken<TodoModel[]>("Todos")

@State<TodoModel[]>({
  name: TODO_STATE_TOKEN,
  defaults: []
})
@Injectable()
export class TodoState {
  constructor(private api: ApiService) {}

  @Action(actions.LoadTodosToState)
  public loadTodos(ctx: StateContext<TodoModel[]>, payload: actions.LoadTodosToState) {
    this.api.getTodos(payload.params).subscribe(data => {
      ctx.setState(data);
    });
  }

  @Action(actions.SortTodos)
  public sortTodos(ctx: StateContext<TodoModel[]>, payload: actions.SortTodos) {
    const oldState: TodoModel[] = JSON.parse(JSON.stringify(ctx.getState()));

    let sorted: TodoModel[] = [];
    switch (payload.type) {
      case "completed":
        sorted = oldState.sort((a,b) => (+a.completed) - (+b.completed));
        break;
    
      case "name":
        sorted = oldState.sort((a,b) => a.title.localeCompare(b.title));
        break;

      case "id":
        sorted = oldState.sort((a,b) => a.id - b.id);
        break;
    }

    ctx.setState(sorted);
  }

  @Action(actions.AddTodo)
  public addTodo(ctx: StateContext<TodoModel[]>, payload: actions.AddTodo) {
    this.api.addNewTodo(payload.newTodo).subscribe(() => {});
  }

  @Action(actions.DeleteTodo)
  public deleteTodo(ctx: StateContext<TodoModel[]>, payload: actions.DeleteTodo) {
    this.api.deleteTodo(payload.id).subscribe(() => {});
  }

  @Action(actions.EditTodo)
  public editTodo(ctx: StateContext<TodoModel[]>, payload: actions.EditTodo) {
    this.api.updateTodo(payload.id, payload.todoToUpdate).subscribe(() => {});
  }

  @Action(actions.ChangeTodoStatus)
  public changeTodoStatus(ctx: StateContext<TodoModel[]>, payload: actions.ChangeTodoStatus) {
    this.api.patchTodo(payload.id, {completed: payload.status}).subscribe(() => {});
  }
}