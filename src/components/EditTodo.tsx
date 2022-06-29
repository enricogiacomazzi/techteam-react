import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TodoItem } from '../models/TodoItem.model';
import { Modal } from './Modal';

interface EditTodoProps {
    todo: TodoItem | undefined
    saveEdit: (edited: TodoItem) => void;
    discardChanges: () => void;
}

export const EditTodo: React.FC<EditTodoProps> = ({todo, saveEdit, discardChanges}) => {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if(!!todo) {
            setValue(todo.text);
        }
    }, [todo]);


    const change = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
    } 


    const save = () => {
        if(!!todo) {
            saveEdit({...todo, text: value});
        }
    }

    return (
        <Modal visible={todo !== undefined}>
            <input type="text" value={value} onChange={change}/>
            <button onClick={save}>Salva</button>
            <button onClick={discardChanges}>Annulla</button>
        </Modal>
    )
}


