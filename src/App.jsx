import {  useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Task from './Task'

import React from 'react';

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

<h2 className='text-2xl '>remaining tasks : {remainTask} </h2>


{filters.map(f=><button key={f} className={filter=== f ? "bg-blue-300 rounded-md text-white font-bold p-2 m-2 hover:bg-blue-300 cursor-pointer" : "p-2 m-2 rounded-md hover:bg-blue-300 cursor-pointer"}   onClick={()=>setFilter(f)}>{f.toUpperCase()}</button>)}
{priorities.map(f=><button key={f} className={priority ===f ? "bg-blue-300 rounded-md text-white font-bold p-2 m-2" : "p-2 m-2 rounded-md hover:bg-blue-300 cursor-pointer"} onClick={()=>setPriority(f)} >{f}</button>)}

<form onSubmit={e => { e.preventDefault(); handleTask(); }} className='grid grid-cols-2 grid-rows-4 gap-4'>
  <input className='bg-gray-300 outline-2 outline-blue-700 p-2 text-sm focus:outline-4 focus:outline-emerald-500  col-span-2'
    type="text" 
    onChange={handleChange}
    value={inputText} 
    placeholder='add Task'
  />
      <textarea name="postContent" placeholder='you can add description later' rows={4} cols={40} onChange={handleDescription}     value={inputArea} className=' focus:outline-4 focus:outline-emerald-500 bg-gray-300 outline-2 outline-blue-700 p-2 text-sm'/>

    <select   onChange={handleOption} value={priority} className='bg-amber-400 '  >
            <option  value=""  disabled selected >Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>

          </select>
<label htmlFor="" className='justify-self-center self-center flex flex-col items-center col-span-2'>
Set Deadline
  <input type="date"    onChange={e=>{setDeadline(e.target.value)}} value={deadline} className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white' />

</label>

  <button type="submit" className='px-4 py-2 bg-emerald-500 rounded-md hover:scale-110 col-span-2'>Add</button>
</form>


<ul>
  
{filteredData.map((task)=><Task key={task.id} task={task} onToggle={handleToggle} handleDelete={handleDelete} onEdit={handleEdit}/>)}



</ul>

</>




}


