import React from 'react';
import { Check2Circle, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';

export default function TodoList(props) {

  const {onComplete, onedit, onDelete, todoList } = props;
  return (
    <div style={{ textAlign: 'center' }}>
      {todoList.map((item, index) => (
        <li
          key={index}
          className="list-item"
        >
          <p type="text" value={item} className= {item.complete  ? "list done" : "list"} onChange={e => e.preventDefault()}>{item.todo}</p> 
          <div className= "icons">
            {(
              <Check2Circle className="completeBtn" onClick={(e)=> onComplete(item.id)} style={{ textDecoration: todoList.completed ? 'line-through' : 'none' }} />
            )}
            <PencilSquare className="editBtn" onClick={() => onedit(index)} />
            <Trash3Fill className="deleteBtn" onClick={() => onDelete(index)} />
          </div>
        </li>
      ))}
    </div>
  );
}