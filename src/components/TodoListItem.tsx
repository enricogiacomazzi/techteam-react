import React from 'react';
import { TodoItem } from "../models/TodoItem.model";
import {Button} from './Button';

interface TodoListItemProps {
    todo: TodoItem;
    setCompleted: () => void;
    deleteTodo: () => void;
    editTodo: () => void;
}


export const TodoListItem: React.FC<TodoListItemProps> = ({todo, setCompleted, deleteTodo, editTodo}) => {
    return (
        <li>
        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
        <Button clicked={setCompleted}>
            <i className='fa fa-check'></i>
        </Button>
        <Button clicked={deleteTodo}>
            <i className='fa fa-trash'></i>
        </Button>
        <Button clicked={editTodo}>
            <i className='fa fa-edit'></i>
        </Button>
    </li>
    );


};