import { title } from 'process';
import React, { createContext, useState } from 'react';
import { Todo } from '../models/Todo';
import { TodoContextType } from './TodoContextType';
import { get, save } from '../services/TodoService';
import { useEffect } from 'react';

export const TodoContext = createContext<TodoContextType>(
    {
        todos: [],
        addTodo: () => { },
        removeTodo: () => { },
        toggle: () => { },
    }
);

const TodoProvider = (props: any) => { 
    const [todos, setTodos] = useState<Todo[]>(get);
    
    //{ id: 1, title: 'ir na academia', done: false }

    // hook que fica observação sempre o "todos".
    // sempre que for alterado ele salva
    useEffect(() => {
        save(todos);
    }, [todos]);

    const addTodo = (title: string) => {
        const todo: Todo = { id: todos.length + 1, title: title, done: false };
        //...todos - abre a lista e coloca o todo dentro 
        setTodos([...todos, todo]);
    }
    
    const removeTodo = (todo: Todo) => {
        const index = todos.indexOf(todo);
        // retornar todos os Todos menos o todo que será excluido
        setTodos(todos.filter((_, i) => i !== index));
    }
    
    const toggle = (todo: Todo) => {
        const index = todos.indexOf(todo);
        todos[index].done = !todo.done;
        setTodos([...todos]);
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggle }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export default TodoProvider;
