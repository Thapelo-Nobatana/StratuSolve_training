<script>
	import { refreshAll } from "$app/navigation";

// @ts-nocheck
    import { updateTask } from "$lib/api/tasks";
    let { task, onToggle,onDelete, refresh} = $props();

    let isEditing = $state(false);
    let title = $derived(task.title);
    let description = $derived(task.description);

    async function save() {
        // onUpdate({
        //     ...task,
        //     title,
        //     description
        // }

        // );

       const data = await updateTask({
            ...task,
            title,
            description
        }
        
        );
        //  const data = await res.json();

         console.log("this is the update:",data);
         if (data.message){
            isEditing = false;
            await refresh()
         }
        }
</script>


<li class="bg-gray-300 p-3 rounded">
  {#if isEditing === true}
     <input class="w-full p-1 mb-2 border rounded" bind:value={title} />

     <textarea class="w-full p-1 mb-2 border rounded" bind:value={description}></textarea>
     <div class="flex gap-2">
        <button class="flex-1 bg-green-400 text-white p-2 rounded" onclick={save}>Save</button>
        <button class="flex-1 bg-red-400 text-white p-2 rounded" onclick={() => isEditing = false}>Cancel</button>
     </div>
     {:else}
       <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center gap-2">
                <span class={task.completed ? 'line-through text-gray-500': ''}>{task.title}</span>
                <input type="checkbox" checked={task.completed} onchange={() => onToggle(task.id)}/>
            </div>
                {#if task.description}
                  <p class="text-sm text-gray-600 ">
                    {task.description}
                  </p>
                {/if}
          </div>
          <div class="flex gap-2">
                <button class="text-blue-500" onclick={() => isEditing = true}>Edit</button>
                <button class="text-red-500" onclick={() => onDelete(task.id)}>Delete</button>
          </div>
       </div>
  {/if}
</li>

