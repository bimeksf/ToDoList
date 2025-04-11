import {   useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Task from './Task'
import TaskForm from './TaskForm'
import React from 'react';

export default function App() {
  const [data, setData] = useState([])
  const [inputText, setInputText] = useState('')
  const [inputArea, setInputArea] = useState('')
  const [filter, setFilter] = useState("all")
  const [priority, setPriority] = useState("all");
  const [deadline, setDeadline] = useState("");
  const [showForm, setShowForm] = useState(false)


function handleShowForm (){
  setShowForm(prev=>!prev)
}



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

<h2 className='text-2xl '>remaining tasks : {remainTask} </h2>

{filters.map(f=><button key={f} className={filter=== f ? "bg-blue-300 rounded-md text-white font-bold p-2 m-2 hover:bg-blue-300 cursor-pointer" : "p-2 m-2 rounded-md hover:bg-blue-300 cursor-pointer"}   onClick={()=>setFilter(f)}>{f.toUpperCase()}</button>)}
{priorities.map(f=><button key={f} className={priority ===f ? "bg-blue-300 rounded-md text-white font-bold p-2 m-2" : "p-2 m-2 rounded-md hover:bg-blue-300 cursor-pointer"} onClick={()=>setPriority(f)} >{f}</button>)}

  <button onClick={handleShowForm} className='bg-red-700 hover:scale-105 cursor-pointer'>{showForm ? "close" : "add task"}</button>

{showForm && <TaskForm onSubmit={handleTask} handleChange={handleChange} inputText={inputText} handleDescription={handleDescription} inputArea={inputArea} handleOption={handleOption} priority={priority} setDeadline={setDeadline} deadline={deadline} />}

<ul>
  
{filteredData.map((task)=><Task key={task.id} task={task} onToggle={handleToggle} handleDelete={handleDelete} onEdit={handleEdit}/>)}


</ul>

</>




}




