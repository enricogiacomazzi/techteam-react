import React, { FormEvent, useRef } from 'react';

interface AddTodoProps {
    onAdd: (text: string) => void
}

export const AddTodo: React.FC<AddTodoProps> = ({onAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const addTodo = (e: FormEvent) => {
        e.preventDefault();
        const value = inputRef.current?.value;
        if(!!value) {
            onAdd(value);
            inputRef.current.value = '';
        }
    }

    return (
        <form onSubmit={addTodo}>
            <input type="text" ref={inputRef}/>
            <input type="submit" value="Aggiungi"/>
        </form>
    )
}