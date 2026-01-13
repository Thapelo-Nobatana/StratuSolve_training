<script>
// @ts-nocheck
    import {fetchCategories} from '$lib/api/categories'
   import { createTask } from "$lib/api/tasks";
   import Swal from 'sweetalert2';
     import { onMount } from 'svelte';
    let { update } = $props()
 let title = $state("");
 let description = $state("")
 let categoryId = $state("");
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
  if(title === "") return Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Title is required!",
 
});
   // creating a tasking
    const res = await createTask({
      title: title,
      description: description,
      completed: false,
      categoryId: categoryId ? +categoryId : null
    })

    title = '';
    description = ''
    categoryId = ''
    if (res.id){
      await update() ;
    }
    else{}
    //error
   
 }
</script>

<div class="flex flex-col justify-center iterms-center gap-2 mb-4">

 <input class="w-full p-3 border rounded" placeholder=" Enter Title"   bind:value={title} >
 <textarea class="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400" placeholder="Task Description" bind:value={description}>

 </textarea>

 <select class="w-full p-3 border rounded" bind:value={categoryId}>
  <option disabled value="">Select a Category</option>
 {#each categories as category (category.id)}
  <option value={category.id}>{category.name}</option>
{/each}
</select>

  <button class="w-full  text-white py-2 rounded bg-blue-600  hover:bg-blue-700 focus:ring-blue-300 cursor-pointer" onclick={submit}>
    Add Task
  </button>

</div>