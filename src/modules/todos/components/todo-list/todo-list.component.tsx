import React, {FC, useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ConfirmationModal, {ConfirmationModalApi, IConfirmationModalEvent} from "../../../main/modals/confirmation/confirmation.modal";
import {ITodo, TodoFilterType} from "../../types/todo.types";
import IconButton from "../../../main/components/icon-button/icon-button.component";
import './todo-list.component.scss';

export type ITodoListEvent = {
    type: "UPDATE" | "DELETE" | "TOGGLE_COMPLETED";
    payload: {
        todo: ITodo
    }
}

type TodoListProps = {
    todos: ITodo[];
    appliedFilter: string | undefined;
    onChange: (event: ITodoListEvent) => void;
}

const TodoList: FC<TodoListProps> = (props) => {

    const {
        todos,
        appliedFilter,
        onChange = (event: ITodoListEvent) => {},
    } = props;

    const [localTodos, localTodosSet] = useState<ITodo[]>([]);

    const onToggleCompletedTodoClick = (todo: ITodo) => {
        onChange({
            type: "TOGGLE_COMPLETED",
            payload: {
                todo: todo,
            }
        })
    }

    const onUpdateTodoClick = (todo: ITodo) => {
        onChange({
            type: "UPDATE",
            payload: {
                todo: todo,
            }
        })
    }

    const onDeleteTodoClick = (todo: ITodo) => {
        if (todo.completed) {
            onChange({
                type: "DELETE",
                payload: {
                    todo: todo,
                }
            })
        }
        else {
            ConfirmationModalApi.show(true, {
                data: todo,
                title: "Delete Uncompleted Todo",
                description: "Are you sure you want to delete this uncompleted todo?",
            });
        }
    }

    const onDeleteConfirmationModalChange = (event: IConfirmationModalEvent) => {
        if (event.action === "CONFIRM" && event.payload.data) {
            ConfirmationModalApi.show(false);
            onChange({
                type: "DELETE",
                payload: {
                    todo: event.payload.data,
                }
            })
        }
        else if (event.action === "CANCEL") {
            ConfirmationModalApi.show(false);
        }
    }

    useEffect(() => {
        if (appliedFilter) {
            if (appliedFilter === TodoFilterType.ALL_TODOS) {
                localTodosSet(todos);
            }
            else if (appliedFilter === TodoFilterType.COMPLETED_TODOS) {
                const completedTodos = todos.filter(todo => todo.completed);
                localTodosSet(completedTodos);
            }
            else if (appliedFilter === TodoFilterType.UNCOMPLETED_TODOS) {
                const uncompletedTodos = todos.filter(todo => !todo.completed);
                localTodosSet(uncompletedTodos);
            }
        }
        else {
            localTodosSet(todos);
        }
    }, [appliedFilter, todos]);

    return (
        <div className="todo-list-component">
            <ConfirmationModal onChange={onDeleteConfirmationModalChange} />

            {
                localTodos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map(todo => {
                    const date = todo.updated_at ? todo.updated_at : todo.created_at;

                    return (
                        <div className="todo-list-wrapper" key={todo.id}>
                            <div className={`todo-description ${todo.completed && 'todo-completed'}`}>
                                <div>
                                    {todo.description}
                                </div>
                                <span className="todo-date"> {new Date(date).toLocaleString()} </span>
                            </div>

                            <div className="todo-actions">
                                <IconButton
                                    icon={todo.completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                                    iconColor="#2e7d32"
                                    onClick={() => onToggleCompletedTodoClick(todo)}
                                />
                                <IconButton
                                    icon={<EditIcon />}
                                    disabled={todo.completed}
                                    iconColor={todo.completed ? "#A6ACB1" : "#656d73"}
                                    onClick={() => onUpdateTodoClick(todo)}
                                />
                                <IconButton
                                    icon={<DeleteIcon />}
                                    iconColor="#d32f2f"
                                    onClick={() => onDeleteTodoClick(todo)}
                                />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TodoList;
