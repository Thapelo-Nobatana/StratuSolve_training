
// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

const API_URL = 'http://localhost:8100';


/**
 * Auth store (single source of truth)
 */
export const user = writable(null);
export let userValues = {}

 //Signup 

export async function signup(email, username, password) {

  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, username, password })
  });
    
   const data = await res.json() ; 
    
    if (data.userId && data.userId > 0)
     {
       goto('/login');
     }
    
}


  //Login 

export async function login(email, password) {

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  console.log(" data from login: ",data)
  
  if (data.error){
    return false ;
  }
  user.set(data);
  userValues = data ;
  return true;
}

export function logout() {
  user.set(null);
  userValues = {}
  goto('/login');
}

// UPDATE PROFILE
export async function updateProfile(data) {
  
  const res = await fetch(`${API_URL}/auth/update/${data.id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)

  })

  const dataResponse = await res.json()

  console.log("this is data from updateProfile:",dataResponse);
}
