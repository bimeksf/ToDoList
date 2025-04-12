
export default function FilteredData (tasks, filter,priority ){
  return tasks.filter((task) => {
    
      if (filter === "all") return true;
    
      const filterStatus =
        filter === "completed" ? task.completed :
        filter === "incomplete" ? !task.completed :
        true;
    
     
        const priorityStatus = priority === "all" || task.priority === priority;
    
      return filterStatus && priorityStatus;
    });
    
}