<script>
  
   import { user } from '$lib/stores/auth.svelte.js';
   import { createTask, fetchTasks } from "$lib/api/tasks";
    let { update } = $props()
 let title = $state(" ");
 let description = $state("")

 async function submit() {
  if(title === " ") return alert(" title is required")
   // creating a tasking
    // onAdd({
    //     id: Date.now,
    //     title: title,
    //     description: description,
    //     completed: false
    // })
    const res = await createTask({
      title: title,
      description: description,
      completed: false,
    })

    if (res.id){
      await update() ;
    }
    else{}
    //error
   
 }
</script>

<div class="flex flex-col justify-center iterms-center gap-2 mb-4">
    
        
 <input class="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 " placeholder="Enter Title"   bind:value={title}  required/>

 <textarea class="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400" placeholder="Task description" bind:value={description}>

 </textarea>
  <button class="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700" onclick={submit}>
    addTask 
  </button>
  
   
</div>