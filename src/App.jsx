import {   useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Task from './components/Task'
import TaskForm from './components/TaskForm'
import React from 'react';
import FilteredData from './components/FilteredData'
export default function App() {
  const [data, setData] = useState([])
  const [inputText, setInputText] = useState('')
  const [inputArea, setInputArea] = useState('')
  const [filter, setFilter] = useState("all")
  const [priority, setPriority] = useState("all");
  const [deadline, setDeadline] = useState("");
  const [showForm, setShowForm] = useState(false)
  
  const taskFormProp = {onSubmit : handleTask, handleChange ,inputText, handleDescription, inputArea, handleOption, priority, setDeadline, deadline }

function handleShowForm (){
  setShowForm(prev=>!prev)
}



const remainTask = data.filter(task=> !task.completed).length

const filteredData = FilteredData(data,filter,priority )




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


{remainTask > 0 && <h2 className='text-2xl '>remaining tasks : {remainTask} </h2> }

<nav>

{filters.map(f=><button key={f} className={filter=== f ? "bg-blue-300 rounded-md text-white font-bold p-2 m-2 hover:bg-blue-300 cursor-pointer" : "p-2 m-2 rounded-md hover:bg-blue-300 cursor-pointer"}   onClick={()=>setFilter(f)}>{f.toUpperCase()}</button>)}
{priorities.map(f=><button key={f} className={priority ===f ? "bg-blue-300 rounded-md text-white font-bold p-2 m-2" : "p-2 m-2 rounded-md hover:bg-blue-300 cursor-pointer"} onClick={()=>setPriority(f)} >{f}</button>)}
</nav>



  <button onClick={handleShowForm} className={`bg-emerald-500 hover:scale-105 cursor-pointer mx-auto p-4 rounded-md m-5 ${showForm ? " bg-red-500 " : ""}`}  >{showForm ? "close" : "add task"}</button>
  <div
  className={`transition-all duration-500 ease-out transform ${
    showForm ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none h-0"
  }`}
>
  <TaskForm {...taskFormProp} />
</div>


<ul>
  
{filteredData.map((task)=><Task key={task.id} task={task} onToggle={handleToggle} handleDelete={handleDelete} onEdit={handleEdit}/>)}


</ul>

</>




}




