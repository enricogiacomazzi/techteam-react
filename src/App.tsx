import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { TodoItem } from './models/TodoItem.model';
import { TodoList } from './components/TodoList';
import produce from 'immer';
import { AddTodo } from './components/AddTodo';
import { EditTodo } from './components/EditTodo';
import { BASE_URL } from './constants';
import { getTodos, myFetch, editTodo as remoteEditTodo, addTodo as remoteAddTodo, deleteTodo as remoteDeleteTodo } from './api';



const App: React.FC = () => {
  const [list, setList] = useState<Array<TodoItem>>([]);

  const init = async () => {
    const items = await getTodos();
    setList(items);
  }

  useEffect(() => {
    init();
  }, []);

  const [edit, setEdit] = useState<TodoItem | undefined>(undefined);

  let completedCount = useMemo(() => {
    return list.filter(x => x.completed).length;
  }, [list]);



  const setCompleted = (item: TodoItem) => {
    editTodo({...item, completed: !item.completed});
  }

  const addTodo = async (text: string) => {
    if(!!text) {
      const created = await remoteAddTodo({text, completed: false});
      setList([...list, created]);
    }
  }

  const startEditTodo =  (todo: TodoItem) => {
    setEdit(todo);
  }

  const deleteTodo = async (id: number) => {
    id = id + 1;
    try {
      await remoteDeleteTodo({id});
      console.log('elimina locale')
      setList(list.filter(t => t.id !== id));
    } catch(e) {
      alert('errore eliminazione');
    }
  
    // const index = list.findIndex(x => x.id === id);
    // list.splice(index, 1);
    // setList([...list]);
  }

  const editTodo = async (edited: TodoItem) => {
    if(!!edited && !!edited.text) {
      console.log('sent', edited);
      const data = await remoteEditTodo(edited);
      const index = list.findIndex(x => x.id === edited.id);
      setList(produce(list, d => {
        d[index] = data;
      }));
      setEdit(undefined);
    }
  }

  return (
    <>
      <h3>{completedCount} elementi</h3>
      <AddTodo onAdd={addTodo}/>
      <TodoList
        list={list}
        setCompleted={setCompleted}
        deleteTodo={deleteTodo}
        editTodo={startEditTodo}/>
      <EditTodo todo={edit}
                saveEdit={editTodo}
                discardChanges={() => setEdit(undefined)}/>
    </>
  );
}

export default App;
