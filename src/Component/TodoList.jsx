import React, { useState } from 'react'
import {Check2Circle,PencilSquare,Trash3Fill } from 'react-bootstrap-icons';

export default function TodoList(props) {

    
      return (
    <div style={{textAlign: 'center'}}>
    {props.todoList.map((item,index)=>
    <li key={index} className='list-item'>
      <input type='text' value={item} className='list' onChange={e => e.preventDefault()} />
      <div className='icons'>
      <Check2Circle className='completeBtn' onClick={() => props.onComplete(todoList.id)} />
          <PencilSquare className='editBtn' onClick={() => props.onedit(index)} />
          <Trash3Fill className='deleteBtn' onClick={() => props.onDelete(index)} />
          
        
      </div>
    </li>
    )}
    </div>
  )
}
