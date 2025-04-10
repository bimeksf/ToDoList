import { useState, useEffect ,useRef } from "react";
import dayjs from 'dayjs';
import React from 'react';
export default function Task({ task, onToggle, handleDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedArea, setEditedArea] = useState(task.description);
  const [editDeadline, setEditDeadline] = useState(task.deadline);
  const [editPriority, setEditPriority] = useState("low");
  const inputRef  = useRef(null)



  const afterDeadline= dayjs(task.deadline).isBefore(dayjs())

  const closeDeadline = dayjs(task.deadline).diff(dayjs() , "hour" ) <=24







  useEffect(() => {
    if (isEditing) {
      setEditedText(task.text);
      setEditedArea(task.description);
      setEditPriority(task.priority); 
      setEditDeadline(task.deadline); 
      inputRef.current.focus();
    }
  }, [isEditing, task.text, task.description, task.priority, task.deadline]);

  function handleSave() {
    if (editedText.trim() !== "") {
      onEdit(task.id, editedText, editedArea ,editPriority,editDeadline); 
      setIsEditing(false);
    }
  }

 




  return (
    <div className="flex">
   { closeDeadline && !afterDeadline && <svg className="w-20 animate-pulse " xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 40 40"><path fill="currentColor" d="M37.874 37.2H2.132a1.742 1.742 0 0 1-1.501-.866a1.707 1.707 0 0 1-.001-1.729L18.507 3.663a1.728 1.728 0 0 1 2.991-.004l17.833 30.869a1.733 1.733 0 0 1-1.457 2.672zM20.001 3.8a.738.738 0 0 0-.628.363L1.496 35.104a.699.699 0 0 0-.001.727a.739.739 0 0 0 .637.369h35.742a.741.741 0 0 0 .732-.73a.787.787 0 0 0-.134-.429L20.634 4.163a.738.738 0 0 0-.633-.363z"/><path fill="currentColor" d="M20.002 27.948a.5.5 0 0 1-.5-.5V9.864a.5.5 0 0 1 1 0v17.584a.5.5 0 0 1-.5.5zm-.004 3.688a.5.5 0 0 1-.5-.5V29.78a.5.5 0 0 1 1 0v1.355a.5.5 0 0 1-.5.501z"/></svg>}
   <li className={`${task.completed ? "underline" : ""} bg-blue-300 rounded-md m-4 ${afterDeadline ? "bg-red-200" : ""}`} onDoubleClick={()=>setIsEditing(true)}>
        {isEditing ? (
          <div className='grid grid-cols-2 grid-rows-4 gap-4'>

          <input className="bg-gray-300 outline-2 outline-blue-700 p-2 text-sm focus:outline-4 focus:outline-emerald-500 col-span-2"
          ref={inputRef }
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          />
          <textarea name="postContent" rows={4} cols={40} onChange={e=>setEditedArea(e.target.value)} value={editedArea} className="col-span-2 bg-gray-300 outline-2 outline-blue-700 p-2 text-sm focus:outline-4 focus:outline-emerald-500" />

          <select name="" id="" onChange={(e)=>setEditPriority(e.target.value)} value={editPriority} className='bg-amber-400'>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>

          </select>

          <input type="date"   className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white' onChange={e=>{setEditDeadline(e.target.value)}} value={editDeadline} />

          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">{task.text}</h1>
            {task.description && <p className="text-l text-gray-400">{task.description}</p>}
            <span>Created on: {new Date(task.createdAt).toLocaleDateString()}</span>
          {<span>Deadline: {task.deadline}</span>}
          <div className={`priority ${task.priority}`}>
            <span className="priority-text">{task.priority}</span>
          </div>
        </div>
        )}

{ !isEditing &&        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />}
     {!isEditing && <button onClick={() => handleDelete(task.id)}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
</svg>
</button>}
      </li>


      {isEditing && (
        <div className="flex justify-center items-center gap-4">
        <button onClick={handleSave} aria-label="Save changes" className="bg-emerald-600 px-4 py-2 hover:scale-105 rounded-md text-md text-white font-medium">Save</button>
        <button onClick={()=>{
    setIsEditing(false);
    setEditedText(task.text)
    setEditedArea(task.description)
  }} aria-label="Cancel changes" className="bg-red-500 px-4 py-2 hover:scale-105 rounded-md text-md text-white font-medium">Cancel</button>
        </div>
      ) }
    </div>
  );
}
