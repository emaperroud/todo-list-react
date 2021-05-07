import React from 'react';

export function TodoItem({todo, checkTodo}) {
    const {id, name, completed} = todo;

    const cambioCheckTodo = () => {
        checkTodo(id)
    }


    return(
       <li> {name}  <input type="checkbox" checked={completed} onChange={cambioCheckTodo} ></input></li>    
    )    
}

