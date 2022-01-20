export interface TodoModel {
  id: number,
  userId: number,
  title: string,
  completed: boolean
}

export interface TodoPostModel {
  userId: number,
  title: string,
  completed: boolean
}