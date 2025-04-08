import {  useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

import Task from './Task'

export default function App() {
  const [data, setData] = useState([])
  const [inputText, setInputText] = useState('')
  const [inputArea, setInputArea] = useState('')
  const [filter, setFilter] = useState("all")
  const [priority, setPriority] = useState("all");
  const [deadline, setDeadline] = useState("");


const remainTask = data.filter(task=> !task.completed).length

const filteredData  = data.filter((task) => {

  if (filter === "all") return true;

  const filterStatus =
    filter === "completed" ? task.completed :
    filter === "incomplete" ? !task.completed :
    true;

 
    const priorityStatus = priority === "all" || task.priority === priority;

  return filterStatus && priorityStatus;
});




  useEffect(()=>{

    localStorage.setItem("todos", JSON.stringify(data) )


  },[data])

  useEffect(()=>{
    const savedData = localStorage.getItem('todos')
    if(savedData)
    setData(JSON.parse(savedData))


  },[])



function handleDescription(e){

  setInputArea(e.target.value)
}

function handleChange(e) {
  setInputText(e.target.value)

}
function handleOption(e) {
  setPriority(e.target.value)

}




function handleTask() {
  if(inputText.trim()!==""){
    setData((prev) => [
       { id: nanoid(), text: inputText ,description:inputArea , priority,completed: false , createdAt: new Date().toISOString() , deadline}, ...prev]) }  else {
        alert('Please provide a task description');
      }

 setInputText('')
 setInputArea('')
 setDeadline('')
}

function handleToggle(id) {
  setData((prev) =>
    prev.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  )
}


function handleDelete(id) {
  setData((prev) => prev.filter((task) => task.id !== id))
}


function handleEdit (id, newText, newDesc, newPriority, newDeadline){
  setData(prev=>prev.map(task=> task.id === id ? {...task, text:newText , description:newDesc , priority:newPriority , deadline:newDeadline} : task ))


}


const filters = ["all", "completed", "incomplete"];
const priorities = ["all","low", "medium", "high"]
return <>

<h2>remaingin tasks : {remainTask} </h2>


{filters.map(f=><button key={f} className={filter=== f ? "active" : ""}   onClick={()=>setFilter(f)}>{f.toUpperCase()}</button>)}
{priorities.map(f=><button key={f} className={priority ===f ? "active" : ""} onClick={()=>setPriority(f)} >{f}</button>)}


<form onSubmit={e => { e.preventDefault(); handleTask(); }}>
  <input 
    type="text" 
    onChange={handleChange}
    value={inputText}
  />
       <label>
      Write your description:
      <textarea name="postContent" placeholder='you can add description later' rows={4} cols={40} onChange={handleDescription}     value={inputArea}/>
    </label>
    <select   onChange={handleOption} value={priority}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>

          </select>

  <input type="date"    onChange={e=>{setDeadline(e.target.value)}} value={deadline} />

  <button type="submit">Add</button>
</form>


<ul>
  
{filteredData.map((task)=><Task key={task.id} task={task} onToggle={handleToggle} handleDelete={handleDelete} onEdit={handleEdit}/>)}



</ul>

</>




}


