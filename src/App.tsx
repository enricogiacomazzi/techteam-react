import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';
import { EditTodo } from './components/EditTodo';

import { CompletedCount } from './components/CompletedCount';
import { useApp } from './hooks/useApp';


const App: React.FC = () => {
  const {
    isLoading,
    addTodo,
    list, 
    onlyCompleted, 
    setOnlyCompleted, 
    addTodoMutation, 
    setCompleted, 
    edit, 
    deleteTodo,
    startEditTodo, editTodo, setEdit} = useApp();

  if(isLoading) {
    return <h1>Loading...</h1>
  }

  return (
  <>
      <CompletedCount/>
      <AddTodo onAdd={addTodo} addError={addTodoMutation.isError} isLoading={addTodoMutation.isLoading}/>
      <input type="checkbox" checked={onlyCompleted} 
        onChange={e => setOnlyCompleted(e.target.checked)}/> Completed <br/>
      <TodoList
        list={list ?? []}
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
