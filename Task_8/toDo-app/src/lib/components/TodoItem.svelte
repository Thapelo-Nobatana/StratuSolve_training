<script>
// @ts-nocheck
    import { updateTask, deleteTask } from "$lib/api/tasks";
    import { showConfirmation } from "$lib/utils/alerts";
    let { task,refresh} = $props();
     // state
    let isEditing = $state(false);
    let title = $derived(task.title);
    let description = $derived(task.description);
    let completed = $derived(task.completed)

    // UPDATE TASK AND SAVE
    async function save() {

       const data = await updateTask({
            ...task,
            title,
            description,
            completed
        });

         console.log("this is the update:",data);
         if (data.message){
            isEditing = false;
            await refresh()
         }
        }

      async function onToggle(){
      completed = !completed
      await save();
    }

   // DELETE TASK
  async function handleDelete(id) {
     const result = await showConfirmation('Delete Item', 'Are you sure you want to delete this item?')
     if(result && result.isConfirmed ) {

           const data = await deleteTask(id)
           console.log("deleted data :",data)
           await refresh()

     }
  }

</script>


<li class="bg-gray-300 p-3 rounded" >
    <!-- <a href="#" onclick={onToggle}> -->
        {#if isEditing === true}
     <input class="w-full p-1 mb-2 border rounded" bind:value={title} />

     <textarea class="w-full p-1 mb-2 border rounded" bind:value={description}></textarea>
     <div class="flex gap-2">
        <button class="flex-1 bg-blue-600 text-white p-2 rounded cursor-pointer" onclick={save}>Save</button>
        <button class="flex-1 bg-gray-500 text-white  p-2 rounded cursor-pointer" onclick={() => isEditing = false}>Cancel</button>
     </div>
     {:else}
       <div class="flex justify-between items-start">
              <div>
                <div class="flex items-center gap-2">
                    <input type="checkbox" checked={task.completed} onchange={onToggle}/>
                    <span class={task.completed ? 'line-through text-gray-500': ''}>{task.title}</span>

                </div>
                    {#if task.description}
                      <p class="text-sm text-gray-600 ">
                        {task.description}
                      </p>
                    {/if}

                    {#if task.category}
                        <span class="px-2 py-1 rounded text-white text-xs" style="background-color: {task.category.color};">
                           {task.category.name}
                        </span>
                        {:else}
                         <span class="text-grey-500 text-xs">No Category</span>
                    {/if}
              </div>

          <div class="flex gap-2">
                <button class="text-blue-500 cursor-pointer" onclick={() => isEditing = true}>Edit</button>
                <button class="text-red-500 cursor-pointer" onclick={() => handleDelete(task.id)}>Delete</button>
          </div>
       </div>
    {/if}
   <!-- </a> -->
</li>

