<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import { fetchTasks } from "$lib/api/tasks";
    import Todoform from "$lib/components/Todoform.svelte";
    import Todolist from "$lib/components/Todolist.svelte";
    import { sessionLoading, user, restoreSessions } from "$lib/stores/auth.svelte";
	import { get } from "svelte/store";
	import { goto } from "$app/navigation";

    let tasks = $state([])

    onMount( async () => {
        await restoreSessions();
        await refreshTasks();

    });

     if(!$user && !get(sessionLoading )) {
            goto('/login');
        }



    async function refreshTasks () {
          tasks = await fetchTasks()
    }

</script>
{#if $user?.role === 'admin'}


     <div class="flex flex-col w-full p-8 items-center  gap-1">
            <div class="self-start">
                <a href="/" class="cursor-pointer ">BACK</a>
            </div>

       
            <div class="bg-gray-100-100  w-full flex mt-5 items-center justify-center">
            <div class="bg-white w-full md:w-1/2 p-6 rounded-xl shadow-xl">
                <h1 class="text-2xl font-bold mb-4 text-center">Todo List</h1>
                <Todoform  update={refreshTasks}/>

                <Todolist tasks={tasks}  refresh={refreshTasks} />
            </div>
            </div>
        </div>
 {/if}

