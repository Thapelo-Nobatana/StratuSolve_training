<script>
    // @ts-nocheck
    import { fetchTasks } from '$lib/api/tasks';
   
	import Button from '$lib/components/Button.svelte';
   
    import {  user,userValues, updateProfile } from '$lib/stores/auth.svelte.js'
     import defaultPhoto from '$lib/assets/default.png';
    import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

     // user edit
    let isEditing = $state(false);
    let username = $state('');
    let email = $state('');
    let photo = $state(null);
    let completedTasks = $state([]);

    onMount( async () => {
       if(!user){
        goto('/login');
       }

        if(userValues) {
            username = userValues.username;
            email = userValues.email
            photo = userValues.photo;
        }
            const allTasks = await fetchTasks(userValues.id)
            console.log("all tasks",allTasks)
            if (allTasks.error ){
                goto('/login')
            }
            completedTasks = allTasks.filter(t => t.completed);

    });

    // load Photo on Profile
    function handlePhoto(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {

            photo = reader.result
        };

        reader.readAsDataURL(file)
    }
    // update the Profile

    async function saveProfile() {

        try {
                 const id = userValues.id

                const res = await updateProfile(
                           id,
                       username,
                  email,
                    photo
                 );

        const data = await res.json();
           console.log("this is the data for update Profile", data);
           username = '';
            email = '';

           return true

        } catch (error) {

              console.log("update error:", error)
        } finally {

                   isEditing = false;
        }
    }


</script>
 {#if userValues}
 <div class="space-y-4 flex flex-col items-center">
        <div class="flex w-full items-center p-8 gap-1">
            <div class="self-start">
                <a href="/" class=" cursor-poiner hove:font-bold ">BACK</a>
            </div>

            <div class="bg-white w-full  flex flex-col p-6 items-center rounded shadow-lg max-w-md mx-auto mt-10">
                <h2 class="text-xl font-bold mb-4">Profile</h2>

                {#if !isEditing}
                    <div class="flex flex-col items-center gap-4">
                    <img src={ photo || defaultPhoto} class="w-24 h-24 rounded-full" alt="profile"/>
                    <p class="text-lg font-semibold">{userValues.username}</p>
                    <p class="text-sm text-gray-500">{userValues.email}</p>
                    <button class="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer" onclick={() => isEditing = true}>
                        Edit Profile
                    </button>
                    </div>
                    {:else}
                    <div class="space-y-4">
                        <img src={  photo || defaultPhoto} class="w-24 h-24 rounded-full mx-auto" alt="profile"/>
                        <input type="file"  onchange={handlePhoto}/>
                        <input type="text" placeholder=" Username" class="w-full p-2 border" bind:value={username} />
                        <input type="email"  placeholder="Email" class="w-full p-2 border" bind:value={email}/>
                        <div class="flex  gap-2">
                        <Button variant="primary" onClick={saveProfile}>Save</Button>
                        <Button variant="secondary" onClick={() => isEditing = false}>Cancel</Button>
                        </div>
                    </div>
                {/if}
            </div>
        </div>


        <!-- {#if completedTasks.length > 0}
            <div class="bg-white w-full flex flex-col gap-2 p-6 items-center rounded shadow-lg max-w-md mx-auto mt-6">
                <h3 class="text-lg font-bold mb-2">Completed Tasks</h3>
                <ul class="list-disc list-inside space-y-1">
                    {#each completedTasks as task}
                      <li class=" flex flex-col gap-2 rounded bg-green-600 ">
                            <a href="/">
                                <div>

                                Title: {task.title}
                                 </div>
                                 <div>
                                 Description: {task.description}
                                 </div>
                                </a>
                      </li>
                    {/each}
                </ul>
            </div>
            {:else}
            <p class="mt-6 ml-72 text-gray-500">No completed tasks yet.</p>
        {/if} -->
 </div>


 {/if}
