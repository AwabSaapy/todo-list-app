import React, { FC, useState, useEffect } from 'react';
import {Dialog, DialogContent, DialogTitle } from "@mui/material";
import {ITodo} from "../../types/todo.types";
import TodoCreateUpdateForm, {ITodoCreateUpdateFormEvent} from "../../forms/todo-create-update/todo-create-update.form";
import "./todo-update.modal.scss";

type IShow = (show: boolean, showOptions?: { updatedTodo?: ITodo}) => void;

export const TodoUpdateModalApi: { show: IShow } = {
    show: () => {}
}

type TodoUpdateModalProps = {
    onChange: (event: ITodoCreateUpdateFormEvent) => void
}

const TodoUpdateModal: FC<TodoUpdateModalProps> = (props) => {

    const {
        onChange,
        ...rest
    }  = props;

    const [modalShow, modalShowSet] = useState(false);
    const [updatedTodo, updatedTodoSet] = useState<ITodo>();

    const show: IShow = (show = true, showOptions = {}) => {
        modalShowSet(show);
        if (showOptions?.updatedTodo) {
            updatedTodoSet(showOptions.updatedTodo);
        }
    }

    useEffect(() => {
        TodoUpdateModalApi.show = show;
    }, []);

    return (
        <Dialog
            className={'todo-update-modal'}
            open={modalShow}
            onClose={() => modalShowSet(false)}
            fullWidth={true}
            {...rest}
        >
            <DialogTitle>
                Todo Update
            </DialogTitle>

            <div className="space-lg" />

            <DialogContent>
                {
                    (modalShow) && <TodoCreateUpdateForm updatedTodo={updatedTodo} onChange={onChange} />
                }

                <div className="space-xl" />
            </DialogContent>

        </Dialog>
    );
}

export default TodoUpdateModal;
