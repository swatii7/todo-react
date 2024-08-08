import React from 'react';
import { Check2Circle, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';

interface TodoProps {
  todoList: {
    complete: boolean; 
    todo: string; 
    id: number;
  }[];
  onComplete: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoProps> = ({ onComplete, onEdit, onDelete, todoList }) => {
  return (
    <ul style={{ textAlign: 'center' }}>
      {todoList.map((item) => (
        <li key={item.id} className="list-item">
          <p className={item.complete ? "list done" : "list"}>
            {item.todo}
          </p> 
          <div className="icons">
            <Check2Circle 
              className="completeBtn" 
              onClick={() => onComplete(item.id)} 
              style={{ textDecoration: item.complete ? 'line-through' : 'none' }} 
            />
            <PencilSquare className="editBtn" onClick={() => onEdit(item.id)} />
            <Trash3Fill className="deleteBtn" onClick={() => onDelete(item.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
