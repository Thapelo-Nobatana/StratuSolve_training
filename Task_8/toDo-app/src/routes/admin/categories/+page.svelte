<script>
// @ts-nocheck
 import Swal from 'sweetalert2';
 import { goto } from '$app/navigation';
 import {fetchCategories, createCategory, deleteCategory} from '$lib/api/categories'
 import { showConfirmation } from "$lib/utils/alerts";
 import Button from '$lib/components/Button.svelte';
 import { userValues } from '$lib/stores/auth.svelte';
 import { onMount } from 'svelte';

  onMount( async() => {
       if(!userValues) return goto('/login');
    await handleGetCategories() ;
  })

      // categories array
    let categories = $state([]);
     // input values state
    let name = $state('');
    let color = $state('');



    // fetch Categories
    async function handleGetCategories(){
        const res = await fetchCategories()
           if (res.err){
                console.log("error orccured")
            return ;
           }
           categories = res ;
    }

    // create categories
 async function creatingCategories() {

        if (!name || name.length <= 0){
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Enter a category name before saving...",
             
                });
            return ;
        }

        let res = await createCategory({
            name: name,
            color: color
        })
        console.log("admin action",res) ;

        if (res.message && res.message.includes("created")){
            await handleGetCategories() ;
        }
    }

 async function handleDeleteCategory(id){
          const confirmResult = await showConfirmation('Delete Item', 'Are you sure you want to delete this item?')


          if(confirmResult && confirmResult.isConfirmed) {

             const result = await deleteCategory(id) ;
             if (result.message && result.message.includes("deleted")){
            await handleGetCategories()  ;
             }
        }

    }

</script>



<div class="flex flex-col items-center gap-2 p-6">
       <div  class="self-start ">
            <div class="cursor-pointer">
            <a href="/profile" class="cursor-pointer">BACK</a>
            </div>
       </div>

       <div class="flex flex-col md:flex-row w-full items-center p-4 gap-1">

            <div class="bg-white w-full  flex flex-col p-6 items-center rounded shadow-lg max-w-md mx-auto mt-10">
                   <h2 class="text-xl font-bold mb-4">Categories</h2>
                   <div class="space-y-5">
                     <input type="text" placeholder="Categorie name" class="w-full p-2 border" bind:value={name} />
                        <input  type="color" placeholder="color" class="w-full p-2 border" bind:value={color}/>
                        <div>
                        <Button variant="primary" onClick={creatingCategories}>create Category</Button>
                        </div>
                   </div>
         </div>
            <div class="bg-white w-full  flex flex-col p-4 items-center rounded shadow-lg max-w-md mx-auto mt-10">
                <h2 class="text-xl font-bold mb-4"> All Categories</h2>
                {#each categories as category}
                    <div class="flex  bg-gray-400 p-2 rounded  mb-4">
                            <div class="flex flex-col gap-2" >
                                <p>  Category Name:{category.name}  </p>
                                <p> Category color {category.color}</p>

                            </div>
                        <button class="flex-1 bg-red-400 text-white p-2 rounded cursor-pointer" onclick={()=>handleDeleteCategory(category.id)}>Delete</button>
                    </div>

                    {/each}
            </div>
       </div>
</div>