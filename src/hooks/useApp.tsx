import { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { getTodos, myFetch, editTodo as remoteEditTodo, addTodo as remoteAddTodo, deleteTodo as remoteDeleteTodo } from '../api';
import { TodoItem } from "../models/TodoItem.model";


export const useApp = () => {
    const [onlyCompleted, setOnlyCompleted] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const {data: list, error, isLoading} = useQuery(['list', onlyCompleted], async () => await getTodos(onlyCompleted));
  
    const invalidate = () => {
      queryClient.invalidateQueries(['list']);
    }
  
    const addTodoMutation = useMutation(
      (newTodo: Omit<TodoItem, 'id'>) => remoteAddTodo(newTodo),
      {
        onSuccess: () => invalidate()
      }
    );
  
    const editTodoMutation = useMutation(
      (edited: TodoItem) => remoteEditTodo(edited),
      {
        onSuccess: () => {
          invalidate();
          setEdit(undefined);
        } 
      }
    );
  
    const deleteTodoMutation = useMutation(
      (id: number) => remoteDeleteTodo({id}),
      {
        onSuccess: () => invalidate()
      }
    );
  
    const [edit, setEdit] = useState<TodoItem | undefined>(undefined);
  
    const setCompleted = (item: TodoItem) => {
      editTodo({...item, completed: !item.completed});
    }
  
  
  
  
    const addTodo = async (text: string) => {
      if(!!text) {
        await addTodoMutation.mutate({text, completed: false});
      }
    }
  
    const startEditTodo =  (todo: TodoItem) => {
      setEdit(todo);
    }
  
    const deleteTodo = async (id: number) => {
      deleteTodoMutation.mutate(id);
    }
  
    const editTodo = async (edited: TodoItem) => {
      if(!!edited && !!edited.text) {
        editTodoMutation.mutate(edited);
      }
    }

    return {
        isLoading,
        list,
        addTodo,
        onlyCompleted,
        setOnlyCompleted,
        setCompleted,
        deleteTodo,
        edit,
        startEditTodo,
        editTodo,
        setEdit,
        addTodoMutation,
    }
  
}