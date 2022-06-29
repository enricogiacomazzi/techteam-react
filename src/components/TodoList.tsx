import React from 'react';
import { TodoItem } from '../models/TodoItem.model';
import { TodoListItem } from './TodoListItem';


interface TodoListProps {
    list: TodoItem[],
    setCompleted: (todo: TodoItem) => void;
    deleteTodo: (id: number) => void;
    editTodo: (todo: TodoItem) => void;
}

export const TodoList:React.FC<TodoListProps> = ({list, setCompleted, deleteTodo, editTodo}) => {
      return  (
        <ul>
          {list.map(x => <TodoListItem
                            key={x.id}
                            todo={x}
                            setCompleted={() => setCompleted(x)}
                            deleteTodo={() => deleteTodo(x.id)}
                            editTodo={() => editTodo(x)}
                         />
            )}
        </ul>
    )
}