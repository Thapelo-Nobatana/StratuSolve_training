<script>
// @ts-nocheck
   import { fetchTasks} from '$lib/api/tasks';
   import { adminFetchAllTask } from '$lib/api/tasks';
   import defaultPhoto from '$lib/assets/default.png';
   import { showConfirmation } from '$lib/utils/alerts';
   import { sessionLoading, user } from '$lib/stores/auth.svelte.js';
   import { goto } from '$app/navigation'
   import {  onMount } from 'svelte';
   import Todoform from "$lib/components/Todoform.svelte";
   import Todolist from "$lib/components/Todolist.svelte";
   import { restoreSessions } from '$lib/stores/auth.svelte.js';
   import { get } from 'svelte/store';

      // list for tasks
      let tasks = $state([]);
      // list for users
      let allUsers = $state([]);
      // list for admin
      let adminTasks = $state([]);

      // Pagination
      let currentTask = $state(5);
      let pageSize = 5;

        //   let paginationAdminTasks = $derived(() => {
        //   const start = (currentPage - 1) * pageSize;
        //   const end = start + pageSize;
        //       return adminTasks.slice(start, end);

        // });

      // total number of pages
      let totalPages = $derived(() => Math.max(1, Math.ceil(adminTasks.length / pageSize)));

     onMount( async () => {
       await restoreSessions();

        if(!get(user) && !get(sessionLoading)) {
        goto('/login')
      }

       await refreshTasks();

       if(get(user)?.role === 'admin') {
          await refreshAdminTasks();
       }

     });

     // Get all tasks
    async function refreshTasks(){

      tasks = await fetchTasks()
      // console.log(tasks);
    }


    // get all users and their tasks (Admin only)

    async function refreshAdminTasks() {
      try {
         const res = await adminFetchAllTask(currentTask);

         adminTasks = res.task ?? res ?? [];
        console.log("this is tasks for admin to see", adminTasks)

      } catch(err) {
        // console.log("Admin task fetch failed", err);
      }

    }
   console.log("this is admin tasks:", adminTasks);
    $effect(() => {
  if (get(user)?.role === 'admin') {
    refreshAdminTasks();
  }
});

   // DELETE USER
  async function handleDelete(id) {
     const result = await showConfirmation('Delete Item', 'Are you sure you want to delete this User?')
     if(result && result.isConfirmed ) {


     }
  }

</script>

 {#if $user?.role === 'admin'}
    <div class="bg-gray-100-100 flex mt-5 items-center justify-center">
      <div class="bg-white w-full md:w-1/2 p-6 rounded-xl shadow-xl">
        <h1 class="text-2xl font-bold mb-4 text-center">All Tasks List</h1>

         <ul class="space-y-2 ">
          <!-- <p>Admin tasks count: { adminTasks.length}</p> -->
          {#each adminTasks as  task (task.id)}
               <li class="bg-gray-300 p-3 rounded" >
                      <div class="flex justify-between items-start">
                            <div>
                                <div class="flex items-center gap-2 mb-2">
                                    <div>
                                      <img src={ task.photo ||  defaultPhoto} class="w-8 h-8 rounded-full mx-auto" alt="profle"/>
                                    </div>
                                    <div class="flex items-center gap-2">
                                       <span><strong>User:</strong> {task.username}</span>
                                     <p> <strong>Email:</strong> {task.email}</p>
                                    </div>


                                </div>
                                      <p> <strong>Task Title</strong> {task.title}</p>
                                      <div class="flex items-center gap-2">
                                              <p><strong>Task Description:</strong> {task.description}</p>
                                      </div>
                                      <div class="flex items-center gap-2">
                                          <strong>Category:</strong>
                                          {#if task.category}
                                           <span class="px-2 py-1 rounded text-white text-xs" style="background-color:{task.category.color};">{task.category.name}</span>
                                           {:else}
                                              <p>None</p>
                                          {/if}
                                      </div>
                            </div>

                          <div class="flex flex-col gap-2">
                                <!-- <button class="text-red-500 cursor-pointer" onclick={() => handleDelete(task.id)}>Delete</button> -->
                          </div>
                      </div>

                </li>

          {/each}
        </ul>
         <div class="flex justify-center items-center gap-2 mt-4">
            <!-- <button class="px-3 py-1 rounded bg-grey-200 disabled:opacity-50 cursor-pointer" disabled={currentTask === 1} onclick={() => currentTask--}>
              Delete
            </button> -->

            <!-- <span class="text-sm">Tasks { currentTask } of {adminTasks.length}</span> -->
            <button class="px-3 py-1 rounded bg-grey-200 disabled:opacity-50" disabled={currentTask === totalPages} onclick={() => currentTask += 5}>
              Load More
            </button>
         </div>
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
