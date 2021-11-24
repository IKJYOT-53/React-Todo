import React,{useState,useRef,useEffect} from 'react'
import ToDoList from "./ToDoList"
import uuidv4 from '../node_modules/uuid/dist/v4'
const local_key = 'todoapp.todos'

function App() {
  const [todos,setTodos] = useState([])
  const todoNameRef = useRef()
  
  //storing todo list on local memory
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(local_key))
    if(storedTodos) setTodos(storedTodos)
  },[])
  useEffect(()=>{
    localStorage.setItem(local_key,JSON.stringify(todos))
  },[todos])
  
  function toggleTodo(id){
    const newTodos=[...todos]
    const todo = newTodos.find(todo =>todo.id === id)
    todo.complete=!todo.complete
    setTodos(newTodos)
  }

//put value of todo on button press
  function handleToDo(e){
    const name =todoNameRef.current.value 
    if(name === '') return
    setTodos(prevTodos =>{
      return [...prevTodos,{id:uuidv4(),name:name,complete:false}]
    })
    todoNameRef.current.value=''
  }
  //clear todos
  function handleClear(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  //main return function
  return (
    <>
    <ToDoList todos={todos} toggleTodo={toggleTodo} />
    <input ref={todoNameRef} text="" />
    <button onClick={handleToDo}>Add Todo</button>
    <button onClick={handleClear}>Clear completed tasks</button>
    <div>{todos.filter(todo => todo.complete).length} tasks completed</div>
    </>
  );
}

export default App;
