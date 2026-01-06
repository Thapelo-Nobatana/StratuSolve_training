<script>
// @ts-nocheck

   import { user,userValues, logout } from '$lib/stores/auth.svelte.js';
   import defaultPhoto from '$lib/assets/default.png';
   import Icon from '@iconify/svelte';
</script>





{#if $user}
   <nav class="bg-orange-300 text-white px-4 py-3 flex justify-between">
     <div class="flex items-center gap-2">
         {#if $user?.role === 'admin'}
         <div class="flex items-center gap-4">
             <a href="/profile">
            <img src={ $user.photo || defaultPhoto} class="w-8 h-8 rounded-full mx-auto" alt="profle" />
              </a>
              <div class="flex items-center gap-4">
                <div class="flex items-center">
                   <a href="/admin/categories"><Icon icon="tabler:layout-navbar-expand" width="24" height="24" /></a> 
                   <a href="/admin/categories">Categories</a>
       
                </div>

                  <div class="flex items-center gap-1">
                    <a href="/"><Icon icon="qlementine-icons:user-16" width="22" height="22" /></a> 
                     <a href="/">Users</a>
                  </div>
                   
              </div>
           

         </div>


          {:else}
            <a href="/userProfile">
              <img src={$user.photo || defaultPhoto} class="w-8 h-8 rounded-full mx-auto" alt="userProfile" />
            </a>

            <p href="" class="text-white">{$user.username}</p>
         {/if}

     </div>

     <button  onclick={logout}>Logout</button>
   </nav>

   
   {:else}
   <nav class="bg-gray-800 text-white px-4 py-3 flex justify-between">
   <span class="font-bold">TodoApp</span>

   <div class="flex gap-2">
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
   </div>
   </nav>
{/if}
