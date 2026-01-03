// @ts-nocheck
import { userValues } from "$lib/stores/auth.svelte";
const API_URL = 'http://localhost:8100';

export async function fetchTasks() {
  const res = await fetch(`${API_URL}/tasks`,{
      headers: { 'Content-Type': 'application/json' ,'Authorization':userValues.userId},
  });
  return await res.json();
}

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

export async function updateTask(data) {
  const res = await fetch(`${API_URL}/tasks/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json','Authorization':userValues.userId},
    body: JSON.stringify(data)
  });
    return await res.json();
}

export async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE'
  });
}