import React, {FC, useEffect, useState} from "react";
import {ITodo, TodoFilterType} from "../../types/todo.types";
import TodoList, {ITodoListEvent} from "../../components/todo-list/todo-list.component";
import TodoCreateUpdateForm, {ITodoCreateUpdateFormEvent} from "../../forms/todo-create-update/todo-create-update.form";
import {useLocalStorage} from "../../../main/custom-hooks/use-local-storage";
import TodoUpdateModal, {TodoUpdateModalApi} from "../../modals/todo-update/todo-update.modal";
import TodoFilterForm, {TodoFilterFormEvent} from "../../forms/todo-filter/todo-filter.form";
import Chip from "../../../main/components/chip/chip.component";
import {getTheCompletedTodos} from "../../others/todos.utils";
import './todos.container.scss';

type TodosContainerProps = {

}

const TodosContainer: FC<TodosContainerProps> = () => {
    const [todos, todosSet] = useLocalStorage<ITodo[]>("todos", []);
    const [appliedFilter, appliedFilterSet] = useState<TodoFilterType>(TodoFilterType.ALL_TODOS);
    const [error, errorSet] = useState<string>("");

    const completedTodos = getTheCompletedTodos(todos);

    const onTodoCreateFormChange = (event: ITodoCreateUpdateFormEvent) => {
        if (event.type === "CREATE" && event.payload.todo) {
            todosSet([...todos, event.payload.todo]);
        }
    }

    const onTodoUpdateModalChange = (event: ITodoCreateUpdateFormEvent) => {
        if (event.type === "UPDATE" && event.payload.todo) {
            const updatedTodos = todos.map(todo => todo.id === event.payload.todo.id ? event.payload.todo : todo)
            todosSet(updatedTodos);

            TodoUpdateModalApi.show(false);
        }
    }

    const onTodoFilterFormChange = (event: TodoFilterFormEvent) => {
        appliedFilterSet(event.type);
    }

    const onTodoListChange = (event: ITodoListEvent) => {
        if (event.type === "DELETE" && event.payload.todo) {
            onDeleteTodo(event.payload.todo);
        }
        else if (event.type === "UPDATE" && event.payload.todo) {
            onUpdateTodo(event.payload.todo);
        }
        else if (event.type === "TOGGLE_COMPLETED" && event.payload.todo) {
            onToggleCompleteTodo(event.payload.todo);
        }
    }

    const onDeleteTodo = (deletedTodo: ITodo) => {
        const isTodoExist = todos.find(todo => todo.id === deletedTodo.id);

        if (!isTodoExist) {
            errorSet("Invalid Todo!")
        }
        else {
            const newTodos = todos.filter(todo => todo.id !== deletedTodo.id);
            todosSet(newTodos);

            if (!newTodos.length) {
                appliedFilterSet(TodoFilterType.ALL_TODOS);
            }
        }

    }

    const onUpdateTodo = (updatedTodo: ITodo) => {
        TodoUpdateModalApi.show(true, {
            updatedTodo: updatedTodo
        })
    }

    const onToggleCompleteTodo = (toggledTodo: ITodo) => {
        const isTodoExist = todos.find(todo => todo.id === toggledTodo.id);

        if (!isTodoExist) {
            errorSet("Invalid Todo!")
        }
        else {
            const newTodos = todos.map(todo => todo.id === toggledTodo.id ? { ...todo, completed: !todo.completed} : todo);
            todosSet(newTodos);
        }
    }

    useEffect(() => {
        if (error) {
            const timer = setTimeout(function() {
                errorSet("")
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="todos-container">
            <TodoUpdateModal onChange={onTodoUpdateModalChange} />
            <TodoCreateUpdateForm onChange={onTodoCreateFormChange} />

            {
                todos?.length ? (
                    <>
                        <div className="space-xl" />
                        <TodoFilterForm appliedFilter={appliedFilter} onChange={onTodoFilterFormChange} />
                        <div className="space-md" />
                        <TodoList todos={todos} appliedFilter={appliedFilter} onChange={onTodoListChange} />
                    </>
                ) : (
                    <>
                        <div className="space-xl" />
                        <span> There are no todos right now! </span>
                    </>
                )
            }

            {error && <div className="todos-error"> {error} </div>}

            {
                (appliedFilter === TodoFilterType.ALL_TODOS && todos?.length > 0) && (
                    <div className="completed-todos-message">
                        <Chip label={`Completed: ${completedTodos.length}/${todos.length}`} color="#2e7d32" />
                    </div>
                )
            }
        </div>
    )
}

export default TodosContainer;
