import React from 'react';
import { TodoItem } from './TodoItem';

export function TodoList({todos, checkTodo}) {
    return(<ul>
        {todos.map( (todo) => (
            <TodoItem key={todo.id} todo={todo} checkTodo={checkTodo} ></TodoItem>
        ))}
    </ul>)    
}