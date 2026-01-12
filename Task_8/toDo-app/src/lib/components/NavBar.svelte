<script>
// @ts-nocheck

   import { user,userValues, logout } from '$lib/stores/auth.svelte.js';
   import defaultPhoto from '$lib/assets/default.png';
   import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

   async function loggingOut() {
     console.log("this is the logout:", )
      const success =  await logout()
      if(success) {
        goto('/login');
      }
      if(!success) {
            console.log("this is after logout:")
      }
      

   }
</script>





{#if $user}
   <nav class="bg-orange-300 text-white px-4 py-3 flex p-8 justify-between">
     <div class="flex items-center gap-2">
         {#if $user?.role === 'admin'}
         <div class="flex items-center gap-4">
             <a href="/profile">
            <img src={ $user.photo || defaultPhoto} class="w-8 h-8 rounded-full mx-auto" alt="profle" />
              </a>
              <div class="flex items-center gap-4">
                <div class="flex items-center cursor-pointer">
                   <a href="/admin/categories"><Icon icon="tabler:layout-navbar-expand" width="24" height="24" /></a> 
                   <a href="/admin/categories">Categories</a>

                </div>

                  <div class="flex items-center gap-1 cursor-pointer">
                    <a href="/"><Icon icon="qlementine-icons:user-16" width="22" height="22" /></a>
                     <a href="/admin/users">Users</a>
                  </div>
              </div>
         </div>

            <p class="text-white">{$user.username}</p>

          {:else}
            <a href="/userProfile">
              <img src={$user.photo || defaultPhoto} class="w-8 h-8 rounded-full mx-auto" alt="userProfile" />
            </a>

            <p  class="text-white">{$user.username}</p>
         {/if}

     </div>

     <button class="cursor-pointer" onclick={loggingOut}>Logout</button>
   </nav>

   {:else}
   <nav class="bg-gray-800 text-white px-4 py-3 flex justify-between">
   <span class="font-bold">TodoApp</span>

   <div class="flex gap-2">
        <a class="cursor-pointer" href="/login">Login</a>
        <a class="cursor-pointer" href="/signup">Signup</a>
   </div>
   </nav>
{/if}
