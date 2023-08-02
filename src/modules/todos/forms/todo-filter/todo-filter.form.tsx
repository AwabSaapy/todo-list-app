import React, {FC} from "react";
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {TodoFilterType} from "../../types/todo.types";
import Button from "../../../main/components/button/button.component";
import './todo-filter.form.scss';

export type TodoFilterFormEvent = {
    type: TodoFilterType
}

type TodoFilterFormProps = {
    onChange: (event: TodoFilterFormEvent) => void;
}

const TodoFilterForm: FC<TodoFilterFormProps> = (props) => {

    const {
        onChange = (event: TodoFilterFormEvent) => {},
    } = props;

    const onAllTodosClick = () => {
        onChange({
            type: TodoFilterType.ALL_TODOS
        });
    }

    const onCompletedTodosClick = () => {
        onChange({
            type: TodoFilterType.COMPLETED_TODOS
        });
    }

    const onUncompletedTodosClick = () => {
        onChange({
            type: TodoFilterType.UNCOMPLETED_TODOS
        });
    }

    return (
        <div className="todo-filter-form">
            <Button label="All Todos" onClick={onAllTodosClick} startIcon={<ChecklistIcon />} />
            <Button label="Completed Todos" onClick={onCompletedTodosClick} startIcon={<CheckCircleIcon />} />
            <Button label="Uncompleted Todos" onClick={onUncompletedTodosClick} startIcon={<HighlightOffIcon />} />
        </div>
    )
}

export default TodoFilterForm;
