<script>
// @ts-nocheck
   import { fetchTasks, updateTask} from '$lib/api/tasks';
   import { user } from '$lib/stores/auth.svelte.js';
   import { goto } from '$app/navigation'
   import {  onMount } from 'svelte';
   import Todoform from "$lib/components/Todoform.svelte";
   import Todolist from "$lib/components/Todolist.svelte";  
      let tasks = $state([])
      
    // if user is not logged go to login page
     onMount( async () => {
      refreshTasks()
     });




    
    async function refreshTasks(){
        if(!$user) {
            goto('/login');
          }

      tasks = await fetchTasks($user.id)
    }

    function toggleTask(id) {
       tasks = tasks.map( task => task.id === id ? {...task, completed: !task.completed}: task)
    }
    async function getUpdateTask(updateTask){
        
        // tasks = tasks.map((t => t.id === updateTask.id ? updateTask: t)

    }
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id)
       
    }
</script>


<div class="bg-gray-100-100 flex mt-5 items-center justify-center">
  <div class="bg-white w-1/2 p-6 rounded-xl shadow-xl">
    <h1 class="text-2xl font-bold mb-4 text-center">Todo List</h1>
    <Todoform  update={refreshTasks}/>

    <Todolist tasks={tasks} onUpdate={updateTask} refresh={refreshTasks} onToggle={toggleTask} onDelete={deleteTask}/>
  </div>
</div>