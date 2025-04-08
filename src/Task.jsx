import { useState, useEffect ,useRef } from "react";

export default function Task({ task, onToggle, handleDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedArea, setEditedArea] = useState(task.description);
  const [editDeadline, setEditDeadline] = useState(task.deadline);
  const [editPriority, setEditPriority] = useState("low");
  const inputRef  = useRef(null)

  useEffect(() => {

    if (isEditing) {
      setEditedText(task.text);
      inputRef .current.focus()
    }
  }, [isEditing, task.text , task.description]);



  function handleSave() {
    if (editedText.trim() !== "" || editedArea.trim() !== "") {
      onEdit(task.id, editedText, editedArea ,editPriority,editDeadline); 
      setIsEditing(false);
    }
  }

 




  return (
    <>
      <li className={task.completed ? "underline" : ""} onDoubleClick={()=>setIsEditing(true) }>
        {isEditing ? (
          <>
          
          <input
          ref={inputRef }
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          />
          <textarea name="postContent" rows={4} cols={40} onChange={e=>setEditedArea(e.target.value)} value={editedArea} />

          <select name="" id="" onChange={(e)=>setEditPriority(e.target.value)} value={editPriority}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>

          </select>

          <input type="date"    onChange={e=>{setEditDeadline(e.target.value)}} value={editDeadline} />

          </>
        ) : (
          <div>
          <h1>{task.text}</h1>
          {task.description && <p>{task.description}</p>}
          <span>Created on: {new Date(task.createdAt).toLocaleDateString()}</span>
          <span>Deadline: {task.deadline}</span>
          <div className={`priority ${task.priority}`}>
            <span className="priority-text">{task.priority}</span>
          </div>
        </div>
        )}

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
      </li>

      <button onClick={() => handleDelete(task.id)}>X</button>

      {isEditing && (
        <div>
        <button onClick={handleSave} aria-label="Save changes">Save</button>
        <button onClick={()=>{
    setIsEditing(false);
    setEditedText(task.text)
    setEditedArea(task.description)
  }} aria-label="Cancel changes">Cancel</button>
        </div>
      ) }
    </>
  );
}
