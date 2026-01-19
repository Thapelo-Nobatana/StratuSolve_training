<script>
// @ts-nocheck


import { fetchAllUsers } from "$lib/api/users";
import { sessionLoading, user } from '$lib/stores/auth.svelte.js';
import { goto } from '$app/navigation'
import {  onMount } from 'svelte';
import { restoreSessions } from '$lib/stores/auth.svelte.js';
import { get } from 'svelte/store';
import Userlist from "$lib/components/Userlist.svelte";
import Userform from "$lib/components/Userform.svelte";

      let allUsers = $state([]);
      let searchedUser = $state(null);
      let isLoading = $state(false);
      // pagination
      let currentUsers = $state(5);
      

     onMount( async () => {

       await restoreSessions()

      if(!get(user) && !get(sessionLoading)) {
        goto('/login');
        return;
      }
          await refreshAllUsers()
     });

    async function refreshAllUsers(){
        isLoading = true
      allUsers = await fetchAllUsers(currentUsers)

      isLoading = false
    }

    function handleUserFound(user) {
       searchedUser = user
    }

    function clearSearch() {
      searchedUser = null;
    }

</script>


<div class="bg-gray-100-100 flex mt-5 items-center justify-center">
  <div class="bg-white w-full md:w-1/2 p-6 rounded-xl shadow-xl">
    <h1 class="text-2xl font-bold mb-4 text-center">User List</h1>
    <Userform  onUserFound={handleUserFound}/>

    <!-- <Userlist users={allUsers}  refresh={refreshAllUsers} /> -->
    {#if searchedUser}
      <div class="flex justify-between items-center mb-3 text-sm">
        <p>
          Showing result for <strong>{searchedUser.email}</strong>
        </p>
        <button
          class="text-blue-600 underline cursor-pointer"
          onclick={clearSearch}
        >
          Clear search
        </button>
      </div>

      <Userlist users={[searchedUser]} refresh={refreshAllUsers} />

    {:else if isLoading}
      <p class="text-center text-gray-500">Loading users...</p>

    {:else}

      <Userlist users={allUsers} refresh={refreshAllUsers} />
            <div class="flex justify-center items-center gap-2 mt-4">
            <!-- <button class="px-3 py-1 rounded bg-grey-200 disabled:opacity-50 cursor-pointer" disabled={currentTask === 1} onclick={() => currentTask--}>
              Delete
            </button> -->

            <!-- <span class="text-sm">Tasks { currentTask } of {adminTasks.length}</span> -->
            <button class="px-3 py-1 rounded bg-grey-200 disabled:opacity-50"  onclick={ async () => {currentUsers += 5
               await refreshAllUsers()} }>
              Load More
            </button>
         </div>
    {/if}
  </div>
</div>
  