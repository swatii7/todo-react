import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'; 
import TodoList from './TodoList';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

export default function Todo() {

  const daily_task = ['walk', 'Go to Temple', 'Make breakfast' , 'study', 'sleep']

  const [inputText, setInputText] = useState('')
  const [todoList, setTodoList] = useState(daily_task)
  const [editTodo, setEditTodo] = useState('')
  

  function addTaskHandler (e){
    e.preventDefault();
    if(!inputText || inputText === ''){
     enqueueSnackbar('Enter task' )
    }
    else{
     setTodoList((prevState)=> [...prevState, inputText]);
     setInputText('')
    }
  }

  function completedTodo(todoId){
    
  }

  function editHandler (i){
   setEditTodo(i)
 const updatedTodo = [...todoList]
 setInputText(updatedTodo[i])
}

function updateTaskHandler(e){
  e.preventDefault();
  const getUpdatedTodo = [...todoList]
  getUpdatedTodo[editTodo] = inputText
  setTodoList(getUpdatedTodo)
  setInputText('')
  setEditTodo('')
}

function deleteHandler(i){
  const deletedItem = todoList.filter((item,index) => i !== index)
  setTodoList(deletedItem)
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
        <TodoList todoList= {todoList} onComplete = {completedTodo} onedit= {editHandler} onDelete= {deleteHandler} />
    </div>
    </>
  )
}
