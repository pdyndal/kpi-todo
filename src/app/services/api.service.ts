import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TodoModel, TodoPostModel } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly URL: string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) { }

  /**
   * Returns todos from mock API
   * 
   * @param params {HttpParams} filter for returned todos by TodoModel fields
   * @returns List of all todos
   */
  public getTodos(params?: HttpParams): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.URL, {
      params
    });
  }

  /**
   * Returns todo by given ID
   * 
   * @param id {number} ID of todo
   * @returns Todo with given ID
   */
  public getTodoById(id: number): Observable<TodoModel> {
    return this.http.get<TodoModel>(`${this.URL}/${id}`);
  }

  /**
   * Creates new todo item and returns it
   * 
   * @param body {TodoPostModel} body to send
   * @returns Created todo item
   */
  public addNewTodo(body: TodoPostModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(this.URL, body);
  }

  /**
   * Updates whole todo item
   * 
   * @param id ID of todo to update
   * @param body Todo item to send
   * @returns Updated todo item
   */
  public updateTodo(id: number, body: TodoModel): Observable<TodoModel> {
    return this.http.put<TodoModel>(`${this.URL}/${id}`, body);
  }

  /**
   * Updates part of todo item
   * 
   * @param id ID of todo to update
   * @param body Part of todo to update
   * @returns Updated todo item
   */
  public patchTodo(id: number, body: Partial<TodoModel>): Observable<TodoModel> {
    return this.http.patch<TodoModel>(`${this.URL}/${id}`, body);
  }

  /**
   * Deletes todo item by ID
   * @param id ID of todo to delete
   * @returns nothing
   */
  public deleteTodo(id: number): Observable<never> {
    return this.http.delete<never>(`${this.URL}/${id}`);
  }
}
