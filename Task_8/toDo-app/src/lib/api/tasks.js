// @ts-nocheck
import { userValues } from "$lib/stores/auth.svelte";
const API_URL = 'http://localhost:8100';




// GET TASKS
export async function fetchTasks() {
  try{
    const res = await fetch(`${API_URL}/tasks`,{
      headers: { 'Content-Type': 'application/json' ,'Authorization':userValues.userId},
  });
  return await res.json();

  }
  catch{
    console.error({err: "Maybe not logged in ? or authed"})
    return []
  }
}

// POST TASKS
export async function createTask(task) {
  if (!userValues.userId)
    return
  try{

    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,'Authorization':userValues.userId},
      body: JSON.stringify(task)
    });
    console.log("res: ",res)
    return await res.json();

  }
  catch{
    console.log("An err occured",userValues) ;
   return {err:"something wrong"} 
  }
}



// UPDATE TASKS
export async function updateTask(data) {
  if(!userValues.userId){
    return
  }
  const res = await fetch(`${API_URL}/tasks/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json','Authorization':userValues.userId},
    body: JSON.stringify(data)
  });
    return await res.json();
}




// DELETE TASKS
export async function deleteTask(id) {
  if(!userValues.userId){
    return 
  }
  try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization':userValues.userId},
    
  });
  return await res.json();

  } catch  {

    console.log("Error onDelete", userValues);
    return { err: "error on delete"};

  }

}