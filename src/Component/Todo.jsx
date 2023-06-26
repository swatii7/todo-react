import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'; 
import TodoList from './TodoList';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

export default function Todo() {

  const daily_task = [ {
    id: 1,
    title: 'walk',
    complete: false 
   }, 
   {
    id: 2,
    title: 'Go to Temple',
    complete: false 
   },
   {
    id: 3,
    title: 'Make breakfast',
    complete: false 
   },
   {
    id: 4,
    title: 'study',
    complete: false 
   },
   {
    id: 5,
    title: 'sleep',
    complete: false 
   }
  ]
  

  const [inputText, setInputText] = useState('')
  const [todoList, setTodoList] = useState(daily_task)
  const [editTodo, setEditTodo] = useState('')
  
//add todo
  function addTaskHandler (e){
    if(inputText){
      let num = todoList.length + 1;
      let newTask = {id: num, title: inputText, complete: false}
     setTodoList([...todoList, newTask]);
     setInputText('')
    }
  }

  //mark as done
function handleComplete (id){
const completeTodo = todoList.map(task => {
  if(task.id === id){
    return({...task, complete: !task.complete })
  }
  return task;
})
setTodoList(completeTodo)
}

//edit todo
  function editHandler (i){
    console.log('edited')
    setEditTodo(i)
    const updatedTodo = [...todoList]
    setInputText(updatedTodo[i].title )
   }

//edit and update edited todo
function updateTaskHandler(e) {
  e.preventDefault();
const getupdatedTodo= [...todoList]
getupdatedTodo[editTodo].title= inputText
setTodoList(getupdatedTodo)
setInputText('')
setEditTodo('')
}

//delete todo
function deleteHandler(i){
  const filteredTodoList = todoList.filter((item,index) => i!== index)
  console.log(filteredTodoList)
  setTodoList(filteredTodoList)

}

  return (
    <>
    <SnackbarProvider />
    <div className='boxWrapper'>
    <h1 className='header'>
      Todo List
    </h1>
        <div className='d-flex'>
        <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter Todo ..."
          aria-label="Enter Task"
          className='inputTask'
          aria-describedby="basic-addon2"
          onChange={(e)=> setInputText(e.target.value)}
          value={inputText}
        />
        {editTodo === ''? <Button variant="outline-secondary" id="button-addon2" onClick={(e)=> addTaskHandler(e)}>
          Add Task
        </Button>:  <Button variant="outline-secondary" id="button-addon2" onClick={(e)=> updateTaskHandler(e)}>
          Update Task
        </Button>  }
      </InputGroup>
      
        </div>
        <TodoList todoList= {todoList}
          onComplete={handleComplete}
          onedit= {editHandler}
           onDelete= {deleteHandler} />
    </div>
    </>
  )
}
