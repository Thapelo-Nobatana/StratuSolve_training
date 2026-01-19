<script>
// @ts-nocheck
import { showConfirmation } from "$lib/utils/alerts";
import { deleteUser } from "$lib/api/users";
    let { user, refresh } = $props();


   // DELETE USER
async function handleDelete(id) {
 const result = await showConfirmation('Delete Item', 'Are you sure you want to delete this User?')
     if(result && result.isConfirmed ) {
           const data = await deleteUser(id)
           console.log("deleted data :",data)
           await refresh()
     }
  }
</script>

<li class="bg-gray-300 p-3 rounded">
       <div class="flex justify-between items-start">
              <div>
                <div class="flex items-center gap-2">
                    <span>UserName: {user.username}</span>

                </div>
                      <p class="text-sm text-gray-600 ">
                       Email: {user.email}
                      </p>
                      <p class="text-sm text-gray-600">User-Role: {user.role}</p>
              </div>
          <div class="flex flex-col gap-2">
                <!-- <button class="text-red-500 cursor-pointer" onclick={() => handleDelete(user.id)}>Delete User</button> -->
          </div>
       </div>
</li>




