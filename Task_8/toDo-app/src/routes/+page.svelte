<script>
// @ts-nocheck
   import { fetchTasks} from '$lib/api/tasks';
   import { sessionLoading, user } from '$lib/stores/auth.svelte.js';
   import { goto } from '$app/navigation'
   import {  onMount } from 'svelte';
   import Todoform from "$lib/components/Todoform.svelte";
   import Todolist from "$lib/components/Todolist.svelte";
   import { restoreSessions } from '$lib/stores/auth.svelte.js';
   import Userform from '$lib/components/Userform.svelte';
   import Userlist from '$lib/components/Userlist.svelte';
   import { get } from 'svelte/store';

      let tasks = $state([])


     onMount( async () => {
       await restoreSessions();
       await refreshTasks();
      if(!get(user) && !get(sessionLoading)) {
        goto('/login')
      }

     });

     // Get all tasks
    async function refreshTasks(){

      tasks = await fetchTasks()
    }

</script>

 {#if $user?.role === 'admin'}
    <div class="bg-gray-100-100 flex mt-5 items-center justify-center">
      <div class="bg-white w-full md:w-1/2 p-6 rounded-xl shadow-xl">
        <h1 class="text-2xl font-bold mb-4 text-center">All Tasks List</h1>
        <!-- <Userform  update={refreshTasks}/>

        <Userlist users={tasks}  refresh={refreshTasks} /> -->
         <ul class="space-y-2 ">
          {#each tasks as  task}
            <!-- <UserItem  user={user} refresh={refresh}  /> -->
          {/each}
        </ul>
      </div>
    </div>
  {:else}
    <div class="bg-gray-100-100 flex mt-5 items-center justify-center">
      <div class="bg-white w-full md:w-1/2 p-6 rounded-xl shadow-xl">
        <h1 class="text-2xl font-bold mb-4 text-center">Todo List</h1>
        <Todoform  update={refreshTasks}/>

        <Todolist tasks={tasks}  refresh={refreshTasks} />
      </div>
    </div>

{/if}
