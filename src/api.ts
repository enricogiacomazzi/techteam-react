import { BASE_URL } from "./constants";
import { TodoItem } from "./models/TodoItem.model";

export const myFetch = async (
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET', 
    id: number | undefined = undefined, body: any = undefined) => {
    const url = !!id ? BASE_URL + '/' + id : BASE_URL;
    const config: any  = {
        method
    };
    if(!!body) {
        config.body = JSON.stringify(body);
        config.headers = {'Content-Type': 'application/json'};
    }

    const res = await fetch(url, config);
    if(res.status >= 300) {
        throw new Error('network error');
    }
    return res.json();
}

export const getTodos = () => myFetch(); // fetch(BASE_URL).then(res => res.json());
export const getTodoById = (id: number) => fetch(BASE_URL + '/' + id).then(res => res.json());
export const addTodo = (todo: Omit<TodoItem, 'id'>) => myFetch('POST', undefined, todo);
export const editTodo = (todo: TodoItem) => myFetch('PUT', todo.id, todo);
export const deleteTodo = (todo: Pick<TodoItem, 'id'>) => myFetch('DELETE', todo.id);
//export const deleteTodo = (todo: Pick<TodoItem, 'id'>) =>  fetch(BASE_URL + '/' + todo.id, {method: 'DELETE'})