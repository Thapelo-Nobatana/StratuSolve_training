<script>
// @ts-nocheck

     import { showConfirmation } from "$lib/utils/alerts";

    let { user, refresh } = $props()



       // view user's Tasks 
    async function veiwTask() {


    }


   // DELETE USER
  async function handleDelete(id) {
     const result = await showConfirmation('Delete Item', 'Are you sure you want to delete this User?')
     if(result && result.isConfirmed ) {

           const data = await deleteTask(id)
           console.log("deleted data :",data)
           await refresh()

     }
  }
</script>

<li class="bg-gray-300 p-3 rounded" >
    <!-- <a href="#" onclick={onToggle}> -->
       <div class="flex justify-between items-start">
              <div>
                <div class="flex items-center gap-2">
                    <!-- <input type="checkbox" checked={task.completed} onchange={onToggle}/> -->
                    <span>UserName: {user.username}</span>

                </div>
                      <p class="text-sm text-gray-600 ">
                       Email: {user.email}
                      </p>

              </div>
         

          <div class="flex flex-col gap-2">
                <!-- <button class="text-blue-500 cursor-pointer" onclick={() => isEditing = true}>Veiw Tasks</button> -->
                <button class="text-red-500 cursor-pointer" onclick={() => handleDelete(task.id)}>Delete User</button>
          </div>
       </div>

   <!-- </a> -->
</li>




