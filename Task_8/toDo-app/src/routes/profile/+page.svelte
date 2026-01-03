<script>
    // @ts-nocheck
    import { fetchTasks } from '$lib/api/tasks';
	import Button from '$lib/components/Button.svelte';
   
    import { user, updateProfile } from '$lib/stores/auth.svelte.js'
     import defaultPhoto from '$lib/assets/default.png';
    import { onMount } from 'svelte';

    let isEditing = $state(false);

    let username = $state('');
    let email = $state('')
    let password = $state('');
    let photo = $state(null);
    let completedTasks = $state([]);

    onMount( async () => {
      
       

        if($user) {
            username = $user.username;
            email = $user.email
            photo = $user.photo;
        }
        
            const allTasks = await fetchTasks($user.id)
            completedTasks = tasks.filter(t => t.completed);
        
       
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
  
    // update the Profile info
    function saveProfile() {
        updateProfile({
            username,
            ...(password && { password}),
            ...(photo && { photo }),
            ...(email && {email})
        });
     
      password = '';
      isEditing = false;
    }
</script>
 {#if user}
 <div class="space-y-4 items-center">
        <div class="flex items-center p-8 gap-4">
            <div class="self-start">
                <a href="/" class=" hove:font-bold ">BACK</a>
            </div>

            <div class="bg-white w-full  flex flex-col p-6 items-center rounded shadow-lg max-w-md mx-auto mt-10">
                <h2 class="text-xl font-bold mb-4">Profile</h2>

                {#if !isEditing}
                    <div class="flex flex-col items-center gap-4">
                    <img src={ photo || defaultPhoto} class="w-24 h-24 rounded-full" alt="profile"/>
                    <p class="text-lg font-semibold">{$user.username}</p>
                    <p class="text-sm text-gray-500">{$user.email}</p>
                    <button class="bg-blue-600 text-white px-4 py-2 rounded" onclick={() => isEditing = true}>
                        Edit Profile
                    </button>
                    </div>
                    {:else}
                    <div class="space-y-4">
                        <img src={  photo || defaultPhoto} class="w-24 h-24 rounded-full mx-auto" alt="profile"/>
                        <input type="file"  onchange={handlePhoto}/>
                        <input type="text" placeholder=" Username" class="w-full p-2 border" bind:value={username} />
                        <input type="email"  placeholder="Email" class="w-full p-2 border" bind:value={email}/>
                        <input type="password" placeholder="New Password" class="w-full p-2 border" bind:value={password} />
                        <div class="flex  gap-2">
                        <Button variant="primary" onClick={saveProfile}>Save</Button>
                        <Button variant="secondary" onClick={() => isEditing = false}>Cancel</Button>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        {#if completedTasks.length > 0}
            <div class="bg-white flex flex-col gap-2 p-6 items-center rounded shadow-lg max-w-md mx-auto mt-6">
                <h3 class="text-lg font-bold mb-2">Completed Tasks</h3>
                <ul class="list-disc list-inside space-y-1">
                    {#each completedTasks as task}
                      <li class="bg-green-600 ">
                        <span><a href="/">{task.title}</a></span>: {task.description}
                      </li>
                    {/each}
                </ul>
            </div>
            {:else}
            <p class="mt-6 ml-72 text-gray-500">No completed tasks yet.</p>
        {/if}
 </div>


 {/if}
