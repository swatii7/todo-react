import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TodoList from './TodoList';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import axios from 'axios';

interface TodoItem {
  complete: boolean;
  id: number;
  todo: string;
}

const Todo: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);

  useEffect(() => {
    axios.get('https://dummyjson.com/todos').then((response) => {
      setTodoList(response.data.todos);
      console.log(response.data.todos);
    });
  }, []);

  // Add todo
  const addTaskHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newTask = {
        id: todoList.length + 1,
        todo: inputText,
        complete: false,
      };
      setTodoList([...todoList, newTask]);
      setInputText('');
    }
  };

  // Mark as done
  const handleComplete = (id: number) => {
    const updatedTodoList = todoList.map((task) =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    setTodoList(updatedTodoList);
  };

  // Edit todo
  const editHandler = (id: number) => {
    const taskToEdit = todoList.find((task) => task.id === id);
    if (taskToEdit) {
      setEditTodoId(id);
      setInputText(taskToEdit.todo);
    }
  };

  // Update edited todo
  const updateTaskHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editTodoId !== null) {
      const updatedTodoList = todoList.map((task) =>
        task.id === editTodoId ? { ...task, todo: inputText } : task
      );
      setTodoList(updatedTodoList);
      setInputText('');
      setEditTodoId(null);
    }
  };

  // Delete todo
  const deleteHandler = (id: number) => {
    const filteredTodoList = todoList.filter((task) => task.id !== id);
    setTodoList(filteredTodoList);
  };

  return (
    <>
      <SnackbarProvider />
      <div className='boxWrapper'>
        <h1 className='header'>Todo List</h1>
        <div className='d-flex'>
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder='Enter Todo ...'
              aria-label='Enter Task'
              className='inputTask'
              aria-describedby='basic-addon2'
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            />
            {editTodoId === null ? (
              <Button variant='outline-secondary' id='button-addon2' onClick={addTaskHandler}>
                Add Task
              </Button>
            ) : (
              <Button variant='outline-secondary' id='button-addon2' onClick={updateTaskHandler}>
                Update Task
              </Button>
            )}
          </InputGroup>
        </div>
        <TodoList
          todoList={todoList}
          onComplete={handleComplete}
          onEdit={editHandler}
          onDelete={deleteHandler}
        />
      </div>
    </>
  );
};

export default Todo;
