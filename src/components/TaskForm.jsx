import dayjs from 'dayjs';
import React from 'react';


export default function TaskForm({onSubmit, handleChange, inputText, handleDescription, inputArea, handleOption, priority, setDeadline, deadline}) {
    return <form onSubmit={(e) => { e.preventDefault(); onSubmit(); } } className='grid grid-cols-1 grid-rows-4 gap-2 max-w-sm mx-auto bg-blue-300 rounded-md p-4'>
      <input className='h-10  bg-gray-300 outline-2 outline-blue-700 p-2 text-sm focus:outline-4 focus:outline-emerald-500  col-span-2'
        type="text"
        onChange={handleChange}
        value={inputText}
        placeholder='add Task' />
      <textarea name="postContent" placeholder='you can add description later' rows={4} cols={40} onChange={handleDescription} value={inputArea} className='h-15 focus:outline-4 focus:outline-emerald-500 bg-gray-300 outline-2 outline-blue-700 p-2 text-sm' />
  
      <select onChange={handleOption} value={priority} className='bg-sky-50 p-2 h-10 '>
        <option value="" disabled>Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
  
      </select>
      <label htmlFor="" className='justify-self-center self-center flex flex-col items-center col-span-2 '>
        Set Deadline
        <input type="date" min={dayjs().format("YYYY-MM-DD")} onChange={e => { setDeadline(e.target.value); } } value={deadline} className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white' />
  
      </label>
  
      <button type="submit" className='px-2 py-1 bg-emerald-500 rounded-md hover:scale-110 col-span-2'>Add</button>
    </form>;
  }