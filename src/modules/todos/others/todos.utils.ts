import {ITodo} from "../types/todo.types";

export const getTheCompletedTodos = (todos: ITodo[]) => {
    return todos.filter(todo => todo.completed);
}
