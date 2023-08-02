import React, {FC, useEffect, useState} from 'react';
import {ITodo} from "../../types/todo.types";
import {v4 as uuidv4} from 'uuid';
import Button from "../../../main/components/button/button.component";
import './todo-create-update.form.scss';

export type ITodoCreateUpdateFormEvent = {
    type: "CREATE" | "UPDATE",
    payload: {
        todo: ITodo
    }
}

type TodoCreateFormProps = {
    updatedTodo?: ITodo | undefined;
    onChange: (event: ITodoCreateUpdateFormEvent) => void;
}

const TODO_INITIAL_STATE: ITodo = {
    id: "",
    description: "",
    created_at: new Date(),
    completed: false,
}

const TodoCreateUpdateForm: FC<TodoCreateFormProps> = (props) => {

    const {
        updatedTodo,
        onChange = (event: ITodoCreateUpdateFormEvent) => {},
    } = props;

    const [todo, todoSet] = useState<ITodo>(TODO_INITIAL_STATE);
    const [error, errorSet] = useState<string>("");

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        todoSet({...todo, description: event.target.value});
    }

    const onButtonClick = () => {
        if (!todo.description) {
            errorSet("The todo name can't be empty");
        }
        else {
            if (updatedTodo) {
                const _updatedTodo = {
                    ...todo,
                    updated_at: new Date(),
                }
                onChange({
                    type: "UPDATE",
                    payload: {
                        todo: _updatedTodo,
                    }
                });
            }
            else {
                const newTodo = {
                    ...todo,
                    id: uuidv4(),
                    created_at: new Date(),
                }

                onChange({
                    type: "CREATE",
                    payload: {
                        todo: newTodo,
                    }
                });
            }

            todoSet(TODO_INITIAL_STATE);
        }
    }

    useEffect(() => {
        if (updatedTodo) {
            todoSet(updatedTodo);
        }
    }, [updatedTodo]);

    useEffect(() => {
        if (error) {
            setTimeout(function() {
                errorSet("")
            }, 3000);
        }
    }, [error]);

    return (
        <div className="todo-create-form">
            <div style={{display: 'flex'}}>
                <input
                    type="text"
                    value={todo.description}
                    onChange={onInputChange}
                    className={`todo-input ${updatedTodo && 'todo-update-input'}`}
                    placeholder='Enter your todo...'
                />

                <Button label={updatedTodo ? "Update" : "Add"} onClick={onButtonClick} />
            </div>

            {error && <div className="empty-todo-message"> {error} </div>}
        </div>
    )
}

export default TodoCreateUpdateForm;
