<script>
// @ts-nocheck

  
    import {fetchCategories} from '$lib/api/categories'
   import { createTask } from "$lib/api/tasks";
     import { onMount } from 'svelte';
    let { update } = $props()
 let title = $state("");
 let description = $state("")
 let categories = $state([])

  onMount( async () => {


     await handleGetCategories()
  })

  // fetch categories 
    async function handleGetCategories(){
        const res = await fetchCategories()
           if (res.err){
                console.log("error orccured")
            return ;
           }
           categories = res ;
    }




 async function submit() {
  if(title === "") return alert(" title is required")
   // creating a tasking
    const res = await createTask({
      title: title,
      description: description,
      completed: false,
    })

    title = '';
    description = ''

    if (res.id){
      await update() ;
    }
    else{}
    //error
   
 }
</script>

<div class="flex flex-col justify-center iterms-center gap-2 mb-4">
    
        
 <input class="w-full p-3 border rounded " placeholder=" Enter Title"   bind:value={title} >
 
 <textarea class="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400" placeholder="Task Description" bind:value={description}>

 </textarea>

 <select>
  <option disabled selected>Select a Category</option>
 {#each categories as category}
  <option value={`bg-${category.color}`}>{category.name}</option>
{/each}
</select>

  <button class="w-full  text-white py-2 rounded bg-blue-600  hover:bg-blue-700 focus:ring-blue-300" onclick={submit}>
    Add Task 
  </button>
  
   
</div>