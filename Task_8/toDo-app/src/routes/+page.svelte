<script>
// @ts-nocheck
   import { fetchTasks} from '$lib/api/tasks';
   import { user } from '$lib/stores/auth.svelte.js';
   import { goto } from '$app/navigation'
   import {  onMount } from 'svelte';
   import Todoform from "$lib/components/Todoform.svelte";
   import Todolist from "$lib/components/Todolist.svelte";  
      let tasks = $state([])
      


     onMount( async () => {
      
      refreshTasks()
     });

    
    async function refreshTasks(){
        if(!$user) {
            goto('/login');
          }

      tasks = await fetchTasks()
    }

</script>


<div class="bg-gray-100-100 flex mt-5 items-center justify-center">
  <div class="bg-white w-full md:w-1/2 p-6 rounded-xl shadow-xl">
    <h1 class="text-2xl font-bold mb-4 text-center">Todo List</h1>
    <Todoform  update={refreshTasks}/>

    <Todolist tasks={tasks}  refresh={refreshTasks} />
  </div>
</div>