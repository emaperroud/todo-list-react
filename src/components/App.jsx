import React, {useState, useRef, useEffect } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {TodoList} from './TodoList'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faPlusCircle} from '@fortawesome/free-solid-svg-icons'

export function App() {
    const [todos, setTodos] = useState([{id: 1, name: 'Tarea 1', completed: false}]);
    
    const todoTaskRef = useRef();

    /*recibe como parametros una funcion de callback, y el elemneto que esta escuchando. 
    Si el segundo parametros es un array vacio, la funcion del primer parametro solo se ejecutará cuando el componente se crea. 
    Si el segundo parametro tiene un elemento, la funcion del primer parametro se ejecutará cuando haya un cambio en ese elemento*/
    useEffect(() => {
        const todosEnLocal = JSON.parse(localStorage.getItem("todoAdd.todos"));
        // const todosParse = JSON.parse(todosEnLocal); 
        if (todosEnLocal) {
            setTodos(todosEnLocal);
        }
    },[]);


    useEffect(() => {
        localStorage.setItem("todoAdd.todos", JSON.stringify(todos));
    },[todos]);

        
    const checkTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };

    const enterTodoAdd = (event) => {
        const name = todoTaskRef.current.value;
        if (event.charCode !== 13) return;
        if (name === '') return; 

        handleTodoAdd();
    }

    const clickTodoAdd = () => {
        const name = todoTaskRef.current.value;
        if (name === '') return; 

        handleTodoAdd();
    }

    const handleTodoAdd = () => {
        const name = todoTaskRef.current.value;
        
        setTodos((prevTodos) => {
            console.log(prevTodos);
            return [...prevTodos, {id: prevTodos.length + 1, name: name, completed: false}]
        })

        todoTaskRef.current.value = null;
    }

    const clickTodoRem = () => {
        const newTodos = todos.filter((t) => !t.completed );
        setTodos(newTodos);
    }

    return(
        <div className="App">
        <header className="App-header">
          <h1>
          Tareas Pendientes
          </h1>
          </header>
          <h2>
          Este es un listado de tus tareas pendientes:
          </h2>
          
          <div>
            <p>Te quedan {todos.filter((t) => t.completed !== true).length} tareas pendientes</p>
            <TodoList todos={todos} checkTodo={checkTodo} />
            <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" onKeyPress={enterTodoAdd} ></input>
            <button onClick={clickTodoAdd}><FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon> </button>
            <button onClick={clickTodoRem}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
          </div>  
        
        
        
        </div>      
            
        
    )    
}
