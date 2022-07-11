import React, { FormEvent, useRef } from 'react';

interface AddTodoProps {
    onAdd: (text: string) => void,
    addError: boolean;
    isLoading: boolean;
}

export const AddTodo: React.FC<AddTodoProps> = ({onAdd, addError, isLoading}) => {
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
            {addError && <span style={{backgroundColor: 'red'}}>Errore inserimento</span>}
            <input type="text" ref={inputRef} disabled={isLoading}/>
            <input type="submit" value="Aggiungi" disabled={isLoading}/>
            {isLoading && <span>loading....</span>}
        </form>
    )
}